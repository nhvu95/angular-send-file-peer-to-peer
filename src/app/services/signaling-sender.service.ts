import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IFileSending,
  IInitChanelReqDTO,
  IInitChanelResDTO,
  ISignalingMessage,
  SignalingMessage
} from '../app.model';
import { UpdateFileSenderProgressAction } from '../sender/sender.action';
import { SenderSelectors } from '../sender/sender.selectors';
import { SignalingService } from './signaling.service';

@Injectable({
  providedIn: 'any',
})
export class SignalingSender extends SignalingService {
  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly rxStompService: RxStompService,
    protected store: Store
  ) {
    super(httpClient, rxStompService);
    console.log('SignalingSender init');
  }

  createConnection() {
    this.localConnection = new RTCPeerConnection(this.configuration);
    //prettier-ignore
    this.dataChannel = this.localConnection.createDataChannel('sendDataChannel');
    this.dataChannel.onopen = this.onSendChannelStateChange.bind(this);

    this.localConnection.addEventListener('icecandidate', async (event) => {
      console.log('Local ICE candidate: ', event.candidate);
      if (event.candidate) {
        this.sharingICECandidateToOtherParty(event.candidate);
      }
    });
  }

  async messageHandler(message: ISignalingMessage) {
    if (!message) return;
    switch (message.content) {
      case 'preflight': {
        console.log('Got preflight message');
        this.setRemoteId(message.from);
        this.createConnection();
        await this.sendOfferToReceiver(message.data);
        break;
      }
      case 'answer': {
        await this.localConnection.setRemoteDescription(message.data);
        break;
      }
    }
    await super.messageHandler(message);
  }

  async sendOfferToReceiver(askingFile: { fileId; partId }) {
    try {
      //prettier-ignore
      const files = this.store.selectSnapshot<IFileSending[]>( SenderSelectors.localFiles );
      const file = files.find((file) => file.fileId === askingFile.fileId);
      if (file) {
        const offer = await this.localConnection.createOffer();
        await this.localConnection.setLocalDescription(offer);

        this.rxStompService.publish({ 
          destination: `/topic/${this.remoteId}`,
          body: JSON.stringify(
            new SignalingMessage(this.localId, this.remoteId, 'offer', offer, {
              fileName: file.fileName,
              fileId: file.fileId,
              fileSize: file.fileData.size,
              totalPart: file.totalPart,
            })
          ),
        });
      } else {
        console.log('File not exist: ');
      }
    } catch (e) {
      console.log('Failed to create session description: ', e);
    }
  }

  onSendChannelStateChange() {
    if (this.dataChannel) {
      const readyState = this.dataChannel.readyState;
      console.log(`Send channel state is: ${readyState}`);
      if (readyState === 'open') {
        this._dataChannel.next('open');
      }
    }
  }

  sendData(fileInput: IFileSending) {
    const self = this;
    const file = fileInput;
    const fileData = file.fileData;
    console.log(`File is ${file.fileName}`);

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
      const data = <ArrayBuffer>e.target.result;
      self.dataChannel.send(data);
      offset += data.byteLength;

      // Update send progress
      self.store.dispatch(new UpdateFileSenderProgressAction(fileInput.fileId, chunkSize));

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

  closeDataChannels() {
    console.log('Closing data channels');
    this.dataChannel.close();
    console.log(`Closed data channel with label: ${this.dataChannel.label}`);
    this.dataChannel = null;

    // Send close connect to receiver
    this.rxStompService.publish({
      destination: `/topic/${this.remoteId}`,
      body: JSON.stringify({
        from: this.localId,
        to: this.remoteId,
        closeChanel: this.dataChannel.label,
      }),
    });

    this.localConnection.close();

    this.localConnection = null;

    console.log('Closed peer connections');
  }

  initCoordinatorChanel(
    body: IInitChanelReqDTO
  ): Observable<IInitChanelResDTO> {
    return this.httpClient.post(
      [
        environment.API_HOST,
        environment.EV_PATH,
        environment.INITIALIZE_PATH,
      ].join('/'),
      body
    );
  }
}
