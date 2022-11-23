import { EPeerState, IFilePartInformation } from '@shared/app.model';

export class AddNewFileInfoAction {
  static readonly type = '[RECEIVER] AddNewFileInfoAction';
  constructor(public file: IFilePartInformation) {}
}

export class SetCurrentStepAction {
  static readonly type = '[RECEIVER] SetCurrentStepAction';
  constructor(public step: number) {}
}

export class GetChannelOwnerAndListFileAction {
  static readonly type = '[RECEIVER] GetChannelOwnerAndListFileAction';
  constructor() {}
}

export class StartLeechingAction {
  static readonly type = '[RECEIVER] StartLeechingAction';
  constructor() {}
}

export class ReceiverResetStateToDefaultAction {
  static readonly type = '[RECEIVER] ReceiverResetStateToDefaultAction';
  constructor() {}
}

export class UpdateFileReceiveProgressAction {
  static readonly type = '[RECEIVER] UpdateFileReceiveProgressAction';
  constructor(public fileId: number, public increaseSize: number) {}
}

export class UpdateReceiverStatusAction {
  static readonly type = '[RECEIVER] UpdatePeerStatus';
  constructor(public peerState: EPeerState, public fileId: number) {}
}

export class DownloadFilePartCompleteAction {
  static readonly type = '[RECEIVER] DownloadFilePartCompleteAction';
  constructor(public fileId: number, public fileIndex: number) {}
}

export class CloseReceiverDataChannelAction {
  static readonly type = '[RECEIVER] CloseReceiverDataChannelAction';
  constructor() {}
}

export class TryToGettingFile {
  static readonly type = '[RECEIVER] TryToGettingFile';
  constructor() {}
}