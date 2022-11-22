import { EPeerState, IFilePartSending } from '@shared/app.model';

export class InitializeSignalingChannelAction {
  static readonly type = '[SENDER] InitializeSignalingChannelAction';
  constructor() {}
}

export class DeleteFilesAction {
  static readonly type = '[SENDER] DeleteFilesAction';
  constructor(public fileIndex: number) {}
}

export class AppendFilesAction {
  static readonly type = '[SENDER] DeleteFilesAction';
  constructor(public files: IFilePartSending[]) {}
}

export class SenderResetStateToDefaultAction {
  static readonly type = '[SENDER] SenderResetStateToDefaultAction';
  constructor() {}
}

export class UpdateFileIdAction {
  static readonly type = '[SENDER] UpdateFileIdAction';
  constructor(public fileId: number, public newFileId: number) {}
}


export class UpdateFileSendingProgressAction {
  static readonly type = '[SENDER] UpdateFileSenderProgressAction';
  constructor(public fileId: number, public increaseSize: number) {}
}

export class UpdateFileSendingCompletedAction {
  static readonly type = '[SENDER] UpdateFileSendingCompletedAction';
  constructor(public peerId, public fileId: number, public filePart: number) {}
}

export class CannotConnectToPeer {
  static readonly type = '[SENDER] CannotConnectToPeer';
  constructor(public fileId: number) {}
}

export class UpdateDataChannelStateAction {
  static readonly type = '[SENDER] UpdateDataChannelState';
  constructor(public state: RTCDataChannelState) {}
}

export class SendDataAction {
  static readonly type = '[SENDER] SendDataAction';
  constructor() {}
}

export class UpdateSenderStatusAction {
  static readonly type = '[SENDER] UpdatePeerStatus';
  constructor(public peerState: EPeerState, public fileId: number) {}
}

export class CloseSenderDataChannelAction {
  static readonly type = '[SENDER] CloseDataChannelAction';
  constructor() {}
}