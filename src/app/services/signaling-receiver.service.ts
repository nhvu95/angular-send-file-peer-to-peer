import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { RxStompService } from '@stomp/ng2-stompjs';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IFileInformation,
  IGetNextPartResDTO,
  IPreFlightModel,
  ISignalingMessage,
  SignalingMessage,
} from '../app.model';
import {
  AddNewFileInfoAction,
  SetCurrentStepAction,
  UpdateFileReceiveProgressAction,
} from '../receiver/receiver.action';
import { SignalingService } from './signaling.service';

@Injectable({
  providedIn: 'any',
})
export class SignalingReceiver extends SignalingService {
  // downloadAnchor;

  crrFileInfo: IFileInformation;

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly rxStompService: RxStompService,
    protected store: Store
  ) {
    super(httpClient, rxStompService);
    this.createConnection();
    console.log('SignalingReceiver init');
  }

  createConnection() {
    this.localConnection = new RTCPeerConnection(this.configuration);

    this.localConnection.addEventListener('icecandidate', async (event) => {
      console.log('Local ICE candidate: ', event.candidate);
      if (event.candidate) {
        this.sharingICECandidateToOtherParty(event.candidate);
      }
    });

    this.localConnection.addEventListener(
      'datachannel',
      this.receiveChannelCallback.bind(this)
    );
  }

  async messageHandler(message: ISignalingMessage) {
    if (!message) return;
    await super.messageHandler(message);
    switch (message.content) {
      case 'offer': {
        await this.localConnection.setRemoteDescription(message.data);
        await this.sendAnswerToSender();
        this.crrFileInfo = message.info;
        this.store.dispatch(new AddNewFileInfoAction(this.crrFileInfo));
        break;
      }
    }
  }

  async sendAnswerToSender() {
    const self = this;
    try {
      const answer = await this.localConnection.createAnswer();
      await this.localConnection.setLocalDescription(answer);

      this.rxStompService.publish({
        destination: `/topic/${this.remoteId}`,
        body: JSON.stringify(
          new SignalingMessage(this.localId, this.remoteId, 'answer', answer)
        ),
      });
    } catch (e) {
      // Stupid way, but it's worked
      setTimeout(async () => {
        await self.sendAnswerToSender();
      }, 1000);
    }
  }

  getNextPartInformation(chanelId: string): Observable<IGetNextPartResDTO> {
    return this.httpClient.get(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.CHANEL_PATH,
        chanelId,
        'partner',
      ].join('/'),
      { params: { peerId: this.localId, fileId: '' } }
    );
  }

  preflightToSender(fileId: string, partId: number = 0) {
    let message: ISignalingMessage = {
      from: this.localId,
      to: this.remoteId,
      content: 'preflight',
      data: <IPreFlightModel>{ fileId, partId },
    };
    this.rxStompService.publish({
      destination: `/topic/${this.remoteId}`,
      body: JSON.stringify(message),
    });
  }

  receiveChannelCallback(event) {
    console.log('Receive Channel Callback');
    this.dataChannel = event.channel;
    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.onmessage = this.onReceiveMessageCallback.bind(this);
    this.dataChannel.onopen = this.onReceiveChannelStateChange.bind(this);
    this.dataChannel.onclose = this.onReceiveChannelStateChange.bind(this);

    this.receivedSize = 0;
    this.bitrateMax = 0;
  }

  onReceiveMessageCallback(event) {
    console.log(`Received Message ${event.data.byteLength}`);
    this.receiveBuffer.push(event.data);
    this.receivedSize += event.data.byteLength;
    // receiveProgress.value = this.receivedSize;

    // we are assuming that our signaling protocol told
    // about the expected file size (and name, hash, etc).

    const file = this.crrFileInfo;
    // Update send progress
    this.store.dispatch(
      new UpdateFileReceiveProgressAction(file.fileId, event.data.byteLength)
    );

    if (this.receivedSize === file.fileSize) {
      const received = new Blob(this.receiveBuffer);
      this.receiveBuffer = [];

      // Notice to sender that download complete
      let message: ISignalingMessage = {
        from: this.localId,
        to: this.remoteId,
        content: 'im-done',
        data: <IPreFlightModel>{ fileId: file.fileId },
      };
      this.rxStompService.publish({
        destination: `/topic/${this.remoteId}`,
        body: JSON.stringify(message),
      });

      FileSaver.saveAs(received, file.fileName);

      // TODO: need another way to save a stream. instead of using fileSaver saveAs

      // const blob = new Blob([received], { type: 'blob' });
      // const url= window.URL.createObjectURL(blob);
      // window.open(url);
      const bitrate = Math.round(
        (this.receivedSize * 8) / (new Date().getTime() - this.timestampStart)
      );

      console.log(
        `Average Bitrate: ${bitrate} kbits/sec (max: ${this.bitrateMax} kbits/sec)`
      );

      if (this.statsInterval) {
        clearInterval(this.statsInterval);
        this.statsInterval = null;
      }

      this.closeDataChannels();
    }
  }

  async onReceiveChannelStateChange() {
    if (this.dataChannel) {
      const readyState = this.dataChannel.readyState;
      console.log(`Receive channel state is: ${readyState}`);
      if (readyState === 'open') {
        this.timestampStart = new Date().getTime();
        this.timestampPrev = this.timestampStart;
        this.statsInterval = setInterval(this.displayStats, 500);
        await this.displayStats();
      }
    }
  }

  closeDataChannels() {
    if (this.dataChannel) {
      this.dataChannel.close();
      console.log(`Closed data channel with label: ${this.dataChannel.label}`);
      this.dataChannel = null;
      this.store.dispatch(new SetCurrentStepAction(3));
    }

    this.localConnection.close();
    this.localConnection = null;
  }
}
