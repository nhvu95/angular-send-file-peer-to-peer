import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import {
  EPeerState,
  IFilePartSending,
  IPreFlightModel,
  ISignalingMessage,
} from '@shared/app.model';
import {
  CannotConnectToPeer,
  UpdateDataChannelStateAction,
  UpdateFileSendingCompletedAction,
  UpdateFileSendingProgressAction,
  UpdateSenderStatusAction,
} from '../sender/sender.action';
import { SharedAppService } from '@shared/shared-app.service';
import { SignalingService } from './signaling.service';
import { RxStompBridgeService } from './rx-stomp-bridge.service';
import { AppSelectors } from '@shared/app.selector';

@Injectable({
  providedIn: 'any',
})
export class SignalingSenderService extends SignalingService {
  // Re write code to avoid circular dependency
  selectedFiles$ = new BehaviorSubject<IFilePartSending[]>([]);
  sendingFiles$ = new BehaviorSubject<IFilePartSending>(null);

  constructor(
    protected readonly httpClient: HttpClient,
    protected commonService: SharedAppService,
    protected store: Store,
    protected rxStompService: RxStompBridgeService
  ) {
    super(httpClient, store, commonService, rxStompService);
    console.log('SignalingSender init');
  }

  createConnection(): void {
    this.connection = new RTCPeerConnection(this.configuration);
    // prettier-ignore
    this.dataChannel = this.connection.createDataChannel('sendDataChannel');
    this.dataChannel.onopen = this.onDataChannelStateChange.bind(this);

    this.connection.addEventListener('icecandidate', async (event) => {
      if (event.candidate) {
        this.storeICECandidate(event.candidate);
      }
    });
  }

  /** ======================================================================================================================
   *                                                     Data Channel - Message Part
   *  ======================================================================================================================/
   * Send Data through WebRTC data channel
   * @through Web RTC Data channel
   * @returns void
   */
  sendData(): void {
    const self = this;
    const file = this.sendingFiles$.getValue();
    const fileData = file.fileData;

    // Handle 0 size files.
    if (fileData.size === 0) {
      this.closeDataChannels();
      return;
    }
    const chunkSize = 16384;
    const fileReader = new FileReader();
    let offset = 0;
    fileReader.addEventListener('error', (error) =>
      console.error('Error reading file:', error)
    );
    fileReader.addEventListener('abort', (event) =>
      console.log('File reading aborted:', event)
    );
    fileReader.addEventListener('load', (e) => {
      console.log('FileRead.onload ', e);
      const data = e.target.result as ArrayBuffer;
      try {
        self.dataChannel.send(data);
      } catch (e) {
        // Set progress to zero
        console.log('Cannot connect to your friend');
        self.store.dispatch(new CannotConnectToPeer(file.fileId));
        return;
      }
      offset += data.byteLength;

      // Update send progress
      self.store.dispatch(
        new UpdateFileSendingProgressAction(file.fileId, chunkSize)
      );

      if (offset < fileData.size) {
        readSlice(offset);
      }
    });
    const readSlice = (o) => {
      console.log('readSlice ', o);
      const slice = fileData.slice(offset, o + chunkSize);
      fileReader.readAsArrayBuffer(slice);
    };
    readSlice(0);
  }

  /**
   * Close WebRTC Data channel
   * Sen
   */
  closeDataChannels(init = false): void {
    try {
      // Whatever it is, forgive me my lord
      if (this.dataChannel) {
        this.dataChannel.close();
        this.store.dispatch(new UpdateDataChannelStateAction('closed'));
        // Send close connect to receiver
        if (!init) {
          this.sendCloseDataChannelMsg();
        }
        this.dataChannel.removeAllListeners('open');
        this.dataChannel.removeAllListeners('close');
        this.dataChannel.removeAllListeners('message');
        this.dataChannel = null;
      }

      this.closeConnection();
      this.store.dispatch(new UpdateSenderStatusAction(EPeerState.IDLE, null));
    } catch (e) {
      // In case we have error GC browser will automatically close it anyway
    }
  }

  /**
   * Update sending status
   * @param data object include info about pairing target
   * @param peerId peerId
   */
  updateSendingStatus(peerId: number, data: IPreFlightModel): void {
    this.store.dispatch(
      new UpdateFileSendingCompletedAction(peerId, data.fileId, data.partIndex)
    );
  }

  /** ======================================================================================================================
   *                                                    Signaling Channel - Message Part
   *  ======================================================================================================================/
   * Message handler
   * Behavior when getting a message from the receiver
   * @param message message got
   * @returns Promise<void>
   */
  async messageHandler(message: ISignalingMessage): Promise<void> {
    console.log(
      `GOT message ${message?.content} from ${message?.from}`,
      message,
      `SENDER ${this.isSenderScreen}`
    );
    if (!message || !this.isSenderScreen) { return; }
    switch (message.content) {
      case 'list-files': {
        this.sendListFileMsg(message.from, message.data);
        this.setConnectingId(message.from);
        break;
      }
      case 'preflight': {
        this.setConnectingId(message.from);
        this.createConnection();
        await this.sendOfferMsg(message.data);
        break;
      }
      case 'webrtc-answer': {
        await this.connection?.setRemoteDescription(message.data);
        this.sendStartSharingICEMsg();
        break;
      }
      case 'get-file-completed': {
        this.updateSendingStatus(message.from, message.data);
        this.closeDataChannels();
        break;
      }
      case 'webrtc-ice-candidate':
        try {
          await this.connection?.addIceCandidate(message.data);
        } catch (e) {
          console.log(e);
        }
        break;
    }
  }

  /**
   * Presend list file to receiver, to let him display the list first
   * @through Signaling Channel (ActiveMQ)
   * @param senderId sender id
   * @param accessKey key to access channel
   */
  async sendListFileMsg(senderId: number, accessKey: string): Promise<void> {
    // tslint:disable-next-line:variable-name
    const _accessKey = this.store.selectSnapshot(AppSelectors.getAccessKey);
    if (accessKey === _accessKey) {
      // prettier-ignore
      const files = this.selectedFiles$.getValue();
      const message: ISignalingMessage = {
        from: this.peerId,
        to: this.connectingPeerId,
        content: 'list-files',
        data: files,
      };
      this.rxStompService.publish(message, senderId);
    }
  }

  /**
   * Send StartSharingICEMsg to receiver, attach the file part information
   * @through Signaling Channel (ActiveMQ)
   */
  async sendStartSharingICEMsg(): Promise<void> {
    const message: ISignalingMessage = {
      from: this.peerId,
      to: this.connectingPeerId,
      content: 'start-sharing-ice',
      data: null,
      info: null,
    };
    this.rxStompService.publish(message, this.connectingPeerId);

    setTimeout(() => {
      this.startSharingICECandidate();
    }, 1000);
  }

  /**
   * Send WebRTC-Offer to receiver, attach the file part information
   * @through Signaling Channel (ActiveMQ)
   * @param askingFile an object include info about the file receiver need
   */
  async sendOfferMsg(askingFile: { fileId; partIndex: number }): Promise<void> {
    try {
      // prettier-ignore
      const files = this.selectedFiles$.getValue();
      const filePart = files.find(
        (file) =>
          file.fileId === askingFile.fileId &&
          file.index === askingFile.partIndex
      );
      if (filePart) {
        const offer = await this.connection.createOffer();
        await this.connection.setLocalDescription(offer);

        const message: ISignalingMessage = {
          from: this.peerId,
          to: this.connectingPeerId,
          content: 'webrtc-offer',
          data: offer,
          info: {
            fileName: filePart.fileName,
            fileId: filePart.fileId,
            fileSize: filePart.fileData.size,
            totalPart: filePart.totalPart,
            index: filePart.index,
          },
        };
        this.rxStompService.publish(message, this.connectingPeerId);

        this.sendingFiles$.next(filePart);
        this.store.dispatch(
          new UpdateSenderStatusAction(EPeerState.SENDING, filePart.fileId)
        );
      } else {
        console.log('File not exist: ', askingFile, files);
        const message: ISignalingMessage = {
          from: this.peerId,
          to: this.connectingPeerId,
          content: 'get-file-failed',
          data: askingFile,
          info: null,
        };
        this.sendingFiles$.next(null);
        this.rxStompService.publish(message, this.connectingPeerId);
        this.closeDataChannels();
        this.store.dispatch(
          new UpdateSenderStatusAction(EPeerState.IDLE, null)
        );
      }
    } catch (e) {
      console.log('Failed to create session description: ', e);
      this.closeDataChannels();
    }
  }

  /**
   * Send close data channel msg to receiver
   * @through Signaling Channel (ActiveMQ)
   */
  sendCloseDataChannelMsg(): void {
    const message: ISignalingMessage = {
      from: this.peerId,
      to: this.connectingPeerId,
      content: 'webrtc-close-channel',
      data: this.dataChannel?.label,
    };
    this.rxStompService.publish(message, this.connectingPeerId);
  }
}
