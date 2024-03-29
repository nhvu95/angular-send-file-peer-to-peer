import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  EPeerState,
  IFilePartInformation,
  IPreFlightModel,
  ISignalingMessage,
  SignalingMessage,
} from '@shared/app.model';
import * as FileSaver from 'file-saver';
import {
  AddNewFileInfoAction,
  DownloadFilePartCompleteAction,
  SetCurrentStepAction,
  UpdateFileReceiveProgressAction,
  UpdateReceiverStatusAction,
} from '../receiver/receiver.action';
import { RxStompBridgeService } from './rx-stomp-bridge.service';
import { SharedAppService } from '../shared/shared-app.service';
import { SignalingService } from './signaling.service';
import streamSaver from 'streamsaver';
import { UpdateDataChannelStateAction } from '../sender/sender.action';
import { AppSelectors } from '@shared/app.selector';
import { SignalingSenderService } from './signaling-sender.service';

@Injectable({
  providedIn: 'any',
})
export class SignalingReceiverService extends SignalingService {
  // downloadAnchor;

  crrFileInfo: IFilePartInformation;
  fileStream: any;
  saveStream: any;
  streamWriter: any;

  constructor(
    protected readonly httpClient: HttpClient,
    protected store: Store,
    protected commonService: SharedAppService,
    protected signalingSenderServ: SignalingSenderService,
    protected rxStompService: RxStompBridgeService
  ) {
    super(httpClient, store, commonService, rxStompService);
  }

  createConnection(): void {
    this.connection = new RTCPeerConnection(this.configuration);

    this.connection.addEventListener('icecandidate', async (event) => {
      if (event.candidate) {
        this.storeICECandidate(event.candidate);
      }
    });

    this.connection.addEventListener(
      'datachannel',
      this.onDataChannelInitialize.bind(this)
    );
  }

  /** ======================================================================================================================
   *                                                     Data Channel - Message Part
   *  ======================================================================================================================/
   * Listen data channel call back;
   * @param event Initialize Event
   */
  onDataChannelInitialize(event): void {
    this.dataChannel = event.channel;
    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.onopen = this.onDataChannelStateChange.bind(this);
    this.dataChannel.onclose = this.onDataChannelStateChange.bind(this);
    this.dataChannel.onmessage = this.onDataChannelGetMsg.bind(this);

    this.receivedSize = 0;
    this.bitrateMax = 0;
  }

  /**
   * On receive message from Data channel
   * Using streamsaver.js
   * @param event Get MessageEvent
   */
  onDataChannelGetMsg(event): void {
    this.receivedSize += event.data.byteLength;
    const file = this.crrFileInfo;
    console.log(`Received bits = ${event.data.byteLength}`);

    // Update send progress
    this.store.dispatch(
      new UpdateFileReceiveProgressAction(file.fileId, event.data.byteLength)
    );
    const uint8View = new Uint8Array(event.data);
    this.streamWriter.write(uint8View);
    // When the file is finished downloading
    if (this.receivedSize === file.fileSize) {
      this.receivedSize = 0;

      this.streamWriter.close();

      const bitrate = Math.round(
        (this.receivedSize * 8) / (new Date().getTime() - this.timestampStart)
      );

      console.log(
        `Average Bitrate: ${bitrate} kbits/sec (max: ${this.bitrateMax} kbits/sec)`
      );

      this.sendGettingFileCompletedMsg(file);

      if (this.statsInterval) {
        clearInterval(this.statsInterval);
        this.statsInterval = null;
      }

      this.store.dispatch(
        new UpdateReceiverStatusAction(EPeerState.IDLE, null)
      );

      this.store.dispatch(
        new DownloadFilePartCompleteAction(file.fileId, file.index)
      );

      this.closeDataChannels();
    }
  }

  /**
   * On Data Channel State Change
   */
  async onDataChannelStateChange(): Promise<void> {
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

  /**
   * Close Data Channel
   */
  closeDataChannels(): void {
    try {
      if (this.dataChannel) {
        this.dataChannel.close();
        this.store.dispatch(new UpdateDataChannelStateAction('closed'));
        this.dataChannel.removeAllListeners('open');
        this.dataChannel.removeAllListeners('close');
        this.dataChannel.removeAllListeners('message');
        this.dataChannel = null;
      }
      this.saveStream?.close();
      this.saveStream = null;
      this.fileStream = null;
      this.streamWriter = null;

      this.closeConnection();
    } catch (e) {
      // In case we have error GC browser will automatically close it anyway
    }

  }

  /**
   * Streamsaver to save the stream directly
   * (Last version I use filesaver and it is limited 2Gb files, Now is better)
   */
  createStreamSaver(): void {
    this.fileStream = streamSaver.createWriteStream(this.crrFileInfo.fileName, {
      size: this.crrFileInfo.fileSize, // (optional filesize) Will show progress
      writableStrategy: undefined, // (optional)
      readableStrategy: undefined, // (optional)
    });
    this.streamWriter = this.fileStream.getWriter();
  }

  /** ======================================================================================================================
   *                                                     Signaling Channel - Message Part
   *  ======================================================================================================================/
   * Signaling Channel message handler
   * Behavior when getting a message from the sender
   * @param message Message Object
   * @returns Promise<void>
   */
  async messageHandler(message: ISignalingMessage): Promise<void> {
    if (!message) { return; }
    console.log(
      `GOT message ${message?.content} from ${message?.from}`,
      message,
      `SENDER ${this.isSenderScreen}`
    );
    switch (message.content) {
      case 'webrtc-answer': {
        await this.signalingSenderServ.messageHandler(message);
        break;
      }
      case 'list-files': {
        const listFiles: IFilePartInformation[] = message.data;
        listFiles.forEach((filePart) => {
          this.store.dispatch(new AddNewFileInfoAction(filePart));
        });
        break;
      }
      case 'start-sharing-ice': {
        this.startSharingICECandidate();
        break;
      }
      case 'webrtc-ice-candidate': {
        try {
          await this.connection?.addIceCandidate(message.data);
        } catch (e) {
          console.log(e);
        }
        break;
      }
      case 'webrtc-offer': {
        this.crrFileInfo = message.info;
        this.createConnection();
        this.createStreamSaver();
        await this.connection.setRemoteDescription(message.data);
        await this.sendAnswerMsg();
        this.store.dispatch(new AddNewFileInfoAction(this.crrFileInfo));
        this.store.dispatch(
          new UpdateReceiverStatusAction(
            EPeerState.TAKING,
            this.crrFileInfo.fileId
          )
        );
        break;
      }
      case 'get-file-failed':
      case 'webrtc-close-channel': {
        try {
          await this.closeDataChannels();
        } catch (e) {
          console.log(e);
        }
        break;
      }
    }
  }

  /**
   * Send an Answer to the sender after getting an offer and file information was attached
   * @through Signaling Channel (ActiveMQ)
   */
  async sendAnswerMsg(): Promise<void> {
    const self = this;
    try {
      const answer = await this.connection.createAnswer();
      await this.connection.setLocalDescription(answer);

      const message: ISignalingMessage = {
        from: this.peerId,
        to: this.connectingPeerId,
        content: 'webrtc-answer',
        data: answer,
      };
      this.rxStompService.publish(message, this.connectingPeerId);

    } catch (e) {
      // Stupid way, but it's worked
      console.log(e);
      setTimeout(async () => {
        await self.sendAnswerMsg();
      }, 1000);
    }
  }

  /**
   * Preflight message, ask sender about the file and part id wana take.
   * @param fileId file Id
   * @param partIndex number
   */
  sendPreflightMsg(fileId: number, partIndex: number = 0): void {
    const message: ISignalingMessage = {
      from: this.peerId,
      to: this.connectingPeerId,
      content: 'preflight',
      data: { fileId, partIndex } as IPreFlightModel,
    };
    this.rxStompService.publish(message, this.connectingPeerId);
  }

  /**
   * Preflight message, ask sender about the files and parts id wana take.
   * @through Signaling Channel (ActiveMQ)
   * @param fileId file Id
   * @param partIndex part index
   */
  sendGetListFilesMsg(ownerId = this.connectingPeerId): void {
    const accessKey = this.store.selectSnapshot(AppSelectors.getAccessKey);
    const message: ISignalingMessage = {
      from: this.peerId,
      to: ownerId,
      content: 'list-files',
      data: accessKey,
    };
    this.rxStompService.publish(message, ownerId);
  }

  /**
   * Inform the sender that receiver get file complete
   * @through Signaling Channel (ActiveMQ)
   * @param file fileId
   */
  sendGettingFileCompletedMsg(file: IFilePartInformation): void {
    // Notice to sender that download complete
    const message: ISignalingMessage = {
      from: this.peerId,
      to: this.connectingPeerId,
      content: 'get-file-completed',
      data: { fileId: file.fileId, partIndex: file.index } as IPreFlightModel,
    };
    this.rxStompService.publish(message, this.connectingPeerId);
  }
}
