export enum RxStompState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

// tslint:disable-next-line:class-name
export interface _TInstanceState {
  connectingPeerId: number;
  localFiles: IFilePartSending[];
  peersCompleted: { [peerId: string]: string[] };
  dataChannelState: RTCDataChannelState;
}

export interface IFilePartInformation {
  fileId: number;
  fileName: string;
  fileSize: number;
  index: number;
  totalPart: number;
}

// tslint:disable-next-line:class-name
export interface _IFilePartSending extends IFilePartInformation {
  status: number;
  currentSize: number;
  fileData: File;
}
export interface IFilePartSending extends Partial<_IFilePartSending> {}

// Initialize model ================
// tslint:disable-next-line:class-name
export interface _InitChannelResDTO {
  channelId: string;
  accessKey: string;
}
export interface IInitChannelResDTO extends Partial<_InitChannelResDTO> {}

// tslint:disable-next-line:class-name
export interface _InitChannelReqDTO {
  peerId: number;
}
export interface IInitChannelReqDTO extends Partial<_InitChannelReqDTO> {}
// =================================

// tslint:disable-next-line:class-name
export interface _FilePart {
  ownerId: number;
  fileId: number;
  index: number; // From 20-11-2022 Now we have only 1 file part with index 0
  channelId: number;
  totalPart: number;
  state: 'NOT_AVAILABLE' | 'TAKING' | 'AVAILABLE';
}
export interface FilePart extends Partial<_FilePart> {}
export type Isingal =
  | 'list-files'
  | 'preflight'
  | 'webrtc-offer'
  | 'webrtc-answer'
  | 'webrtc-ice-candidate'
  | 'start-sharing-ice'
  | 'webrtc-close-channel'
  | 'get-file-completed'
  | 'get-file-failed';

/**
 * Common signaling message model, which send between sender and receiver
 * @content : list-file            ==> @data = accessKey string
 * @content : offer                ==> @data = { fileId; partIndex }
 * @content : answer               ==> @data = RTCSessionDescriptionInit
 * @content : iceCandidate         ==> @data = RTCIceCandidateInit
 * @content : get-file-completed   ==> @data = { fileId; partIndex }
 */
// tslint:disable-next-line:class-name
export interface _ISignalingMessage {
  from: number;
  to: number;
  content: Isingal;
  data: any;
  info: IFilePartInformation;
}
export interface ISignalingMessage extends Partial<_ISignalingMessage> {}
export class SignalingMessage implements _ISignalingMessage {
  from: number;
  to: number;
  content: Isingal;
  data: any;
  info: IFilePartInformation;
  constructor(
    from: number,
    to: number,
    content: Isingal,
    data: any,
    info: IFilePartInformation = null
  ) {
    this.from = from;
    this.to = to;
    this.content = content;
    this.data = data;
    this.info = info;
  }
}

/**
 * PreFlight message model to ask sender =
 * Do you have this file id?
 */
export interface IPreFlightModel {
  fileId: number;
  partIndex: number;
}

/**
 * State of a peer - a browser
 */
export enum EPeerState {
  IDLE = 'IDLE',
  TAKING = 'TAKING',
  SENDING = 'SENDING',
}

/**
 * State of step which display on the screen
 */
export interface ISteps{
  state: 'normal' | 'pass' | 'error';
  disable: boolean;
  name: string;
}
