import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetPeerIdAction } from '@shared/app.action';
import {
  EPeerState,
  FilePart,
  IInitChannelResDTO,
  ISignalingMessage,
} from '@shared/app.model';
import { AppSelectors } from '@shared/app.selector';
import { Message } from '@stomp/stompjs';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UpdateDataChannelStateAction } from '../sender/sender.action';
import { RxStompBridgeService } from './rx-stomp-bridge.service';
import { SharedAppService } from '../shared/shared-app.service';
import { STUN_SERVER, TURN_SERVER } from './constant';

@Injectable()
export class SignalingService {
  configuration = {
    iceServers: [
      ...TURN_SERVER,
      ...STUN_SERVER,
    ],
  };
  readonly peerLocalId = 'peerLocalIdV2';

  peerId: number;
  connectingPeerId: number;
  isSenderScreen: boolean;

  connection: RTCPeerConnection;
  dataChannel: RTCDataChannel;

  iceCandidates$ = new ReplaySubject<RTCIceCandidate>(100);
  cleanIceCandidates$ = new Subject();

  // tslint:disable-next-line:variable-name
  _receivedMessages$ = new BehaviorSubject<ISignalingMessage>(null);
  receivedMessages$ = this._receivedMessages$.asObservable();

  subscription: Subscription;
  // _dataChannelState = new BehaviorSubject<String>(null);
  // dataChannelState$ = this._dataChannelState.asObservable();

  receiveBuffer = [];
  receivedSize = 0;

  bytesPrev = 0;
  timestampPrev = 0;
  timestampStart;
  statsInterval = null;
  bitrateMax = 0;

  constructor(
    protected readonly httpClient: HttpClient,
    protected store: Store,
    protected commonService: SharedAppService,
    protected rxStompService: RxStompBridgeService
  ) {
    this.receivedMessages$.subscribe(async (message) => {
      await this.messageHandler(message);
    });
    this.store.select(AppSelectors.getScreen).subscribe((screen) => {
      this.isSenderScreen = screen === 'sender';
    });
    this.getLocalPeerId().subscribe((peerId) => {
      // Create new PeerId everytime
      this.peerId = peerId;
      localStorage.setItem(this.peerLocalId, String(this.peerId));
      this.store.dispatch(new SetPeerIdAction(peerId));
      this.setLocalIdAndStartListenMessage(peerId);
    });
  }

  createConnection(): void {}

  async messageHandler(message: ISignalingMessage): Promise<any> {}

  /**
   * Subcribe message from Signaling Channel
   */
  subcribeMessage(): void {
    if (!this.subscription) {
      this.subscription = this.rxStompService
        .getRxMessage$()
        .subscribe((message: Message) => {
          const body = JSON.parse(message.body);
          this._receivedMessages$.next(body);
        });
    }
  }

  /**
   * On Data Channel state change
   */
  onDataChannelStateChange(): void {
    const self = this;
    if (this.dataChannel) {
      const readyState = this.dataChannel.readyState;
      self.store.dispatch(new UpdateDataChannelStateAction(readyState));
    }
  }

  /**
   * Set Local PeerId and start listen message from Signaling Channel (ActiveMQ)
   * @param localId peerId of current browser
   */
  setLocalIdAndStartListenMessage(localId: number): void {
    this.peerId = localId;
    this.subcribeMessage();
  }

  /**
   * Set remote PeerId (Receiver Id)
   * @param connectingPeerId peerId of message receiver
   */
  setConnectingId(connectingPeerId: number): void {
    this.connectingPeerId = connectingPeerId;
  }

  /**
   * Store ICE Candidate
   * @param candidate RTCCandidate
   */
  storeICECandidate(candidate: RTCIceCandidate): void {
    this.iceCandidates$.next(candidate);
  }

  /**
   * Start sharing ICE Candidate
   */
  startSharingICECandidate(): void {
    this.iceCandidates$
      .pipe(takeUntil(this.cleanIceCandidates$))
      .subscribe((ice) => {
        this.sharingICECandidateToOtherParty(ice);
      });
  }

  /**
   * Close Connection
   */
  closeConnection(): void {
    this.connection?.close();
    this.connection?.removeAllListeners('webrtc-ice-candidate');
    this.connection?.removeAllListeners('datachannel');
    this.connection?.removeAllListeners('open');

    this.cleanIceCandidates$.next(true);
    this.cleanIceCandidates$.complete();
    this.cleanIceCandidates$ = new Subject();
    this.iceCandidates$ = new ReplaySubject(100);

    this.connection = null;
  }

  /**
   * When a peer get ICE candidate, it shares ICE with others
   * @param candidate RTCCandidate
   */
  sharingICECandidateToOtherParty(candidate: RTCIceCandidate): void {
    const message: ISignalingMessage = {
      from: this.peerId,
      to: this.connectingPeerId,
      content: 'webrtc-ice-candidate',
      data: candidate,
    };
    this.rxStompService.publish(message, this.connectingPeerId);
  }

  /**
   * Display bitrate statistics.
   */
  async displayStats(): Promise<void> {
    if (this.connection && this.connection.iceConnectionState === 'connected') {
      const stats: any = await this.connection.getStats();
      let activeCandidatePair;
      stats.forEach((report) => {
        if (report.type === 'transport') {
          activeCandidatePair = stats.get(report.selectedCandidatePairId);
        }
      });
      if (activeCandidatePair) {
        if (this.timestampPrev === activeCandidatePair.timestamp) {
          return;
        }
        // calculate current bitrate
        const bytesNow = activeCandidatePair.bytesReceived;
        const bitrate = Math.round(
          ((bytesNow - this.bytesPrev) * 8) /
            (activeCandidatePair.timestamp - this.timestampPrev)
        );
        console.log(`Current Bitrate: ${bitrate} kbits/sec`);

        this.timestampPrev = activeCandidatePair.timestamp;
        this.bytesPrev = bytesNow;
        if (bitrate > this.bitrateMax) {
          this.bitrateMax = bitrate;
        }
      }
    }
  }

  /** ======================================================================================================================
   *                                                      API Integrate
   *  ======================================================================================================================/
   * STEP 1: Get local peer Id
   * @returns peerId
   */
  getLocalPeerId(): Observable<number> {
    return this.httpClient.get<number>(
      [environment.API_HOST, environment.EV_PATH, environment.PEER_PATH].join(
        '/'
      )
    );
  }

  /**
   *  STEP 2: Sender initialize and signaling channel
   */
  initializeSignalingChannel(peerId: number): Observable<IInitChannelResDTO> {
    return this.httpClient.post(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.INITIALIZE_PATH,
      ].join('/'),
      { peerId }
    );
  }

  /**
   * STEP 3: Sender register a file to send to receiver
   * @param channelId channelId
   * @param totalPart totalPart of File, default = 1
   */
  registerFile(channelId: string, totalPart: number): Observable<FilePart> {
    return this.httpClient.post(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.CHANNEL_PATH,
        channelId,
        environment.FILE_PATH,
      ].join('/'), { totalPart }
    );
  }

  /**
   * STEP 4: Receiver ask to take a part from signaling channel
   * @param channelId channelId
   * @returns Observable<peerIdOfChannelOwner>
   */
  getChannelOwner(channelId: string): Observable<number> {
    return this.httpClient.get<number>(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.CHANNEL_PATH,
        channelId,
        'owner',
      ].join('/')
    );
  }

  /**
   * STEP 4: Receiver ask to take a part from signaling channel
   * @param channelId string
   * @returns Observable<FilePart>
   */
  getNextPartInformation(
    channelId: string,
    fileId: number = null
  ): Observable<FilePart> {
    if (fileId) {
      return this.httpClient.get(
        [
          environment.API_HOST,
          environment.EV_PATH,
          environment.CHANNEL_PATH,
          channelId,
          environment.FILE_PATH,
        ].join('/'),
        { params: { fileId } }
      );
    }
    return this.httpClient.get(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.CHANNEL_PATH,
        channelId,
        environment.FILE_PATH,
      ].join('/')
    );
  }

  /**
   * STEP 5: Update download part status
   * @param channelId channel id
   * @returns Observable<FilePart>
   */
  gettingPartComplete(
    channelId: string,
    fileId: number = null,
    partIndex: number,
    totalPart: number
  ): Observable<FilePart> {
    return this.httpClient.put(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.CHANNEL_PATH,
        channelId,
        environment.FILE_PATH,
      ].join('/'),
      { fileId: Number(fileId), index: partIndex, totalPart }
    );
  }

  /**
   * STEP 6: Update peer status
   * @param channelId channel id
   * @returns Observable<FilePart>
   */
  updatePeerStatus(
    peerId: number,
    state: EPeerState,
    fileId: number = null
  ): Observable<FilePart> {
    return this.httpClient.put(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.PEER_PATH,
        peerId,
      ].join('/'),
      { peerId: Number(peerId), state, fileId: fileId ? Number(fileId) : null }
    );
  }
}
