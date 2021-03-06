import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import {
  ISignalingMessage
} from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class SignalingService {
  configuration = {
    iceServers: [
      {
        urls: 'turn:18.219.253.176:3478',
        username: 'vietnam:vietnam',
        credential: 'lt-cred-mech',
      },
      {
        urls: 'stun:18.219.253.176:3478'
      },
    ],
  };

  localId: string;
  remoteId: string;

  localConnection: RTCPeerConnection;
  dataChannel: RTCDataChannel;

  _receivedMessages = new BehaviorSubject<ISignalingMessage>(null);
  receivedMessages$ = this._receivedMessages.asObservable();

  _dataChannel = new BehaviorSubject<String>(null);
  dataChannel$ = this._dataChannel.asObservable();

  receiveBuffer = [];
  receivedSize = 0;

  bytesPrev = 0;
  timestampPrev = 0;
  timestampStart;
  statsInterval = null;
  bitrateMax = 0;

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly rxStompService: RxStompService
  ) {
    this.receivedMessages$.subscribe(async (message) => {
      await this.messageHandler(message);
    });
  }

  createConnection() {}

  async messageHandler(message: ISignalingMessage) {
    if (message.content === 'iceCandidate' && message.data) {
      console.log('Got iceCandidate message');
      try {
        this.localConnection.addIceCandidate(message.data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  subcribeMessage() {
    this.rxStompService
      .watch(`/topic/${this.localId}`)
      .subscribe((message: Message) => {
        this._receivedMessages.next(JSON.parse(message.body));
      });
  }

  setLocalIdAndStartListenMessage(localId: string) {
    this.localId = localId;
    this.subcribeMessage();
  }

  setRemoteId(remoteId: string) {
    this.remoteId = remoteId;
  }

  sharingICECandidateToOtherParty(candidate: RTCIceCandidate) {
    const message: ISignalingMessage = {
      from: this.localId,
      to: this.remoteId,
      content: 'iceCandidate',
      data: candidate,
    };

    this.rxStompService.publish({
      destination: `/topic/${this.remoteId}`,
      body: JSON.stringify(message),
    });
  }

  // display bitrate statistics.
  async displayStats() {
    if (
      this.localConnection &&
      this.localConnection.iceConnectionState === 'connected'
    ) {
      const stats: any = await this.localConnection.getStats();
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
}
