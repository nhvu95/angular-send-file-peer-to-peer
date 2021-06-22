import { IFileInformation } from '../app.model';

export class AccessChanelAction {
  static readonly type = 'RA1';
  constructor(public chanelId: string, public accessKey: string) {}
}

export class AddNewFileInfoAction {
  static readonly type = 'RA2';
  constructor(public file: IFileInformation) {}
}

export class SetCurrentStepAction {
  static readonly type = 'RA3';
  constructor(public step: number) {}
}

export class StartLeechingAction {
  static readonly type = 'RA4';
  constructor() {}
}

export class ReceiverResetStateToDefaultAction {
  static readonly type = 'RA5';
  constructor() {}
}

export class UpdateFileReceiveProgressAction {
  static readonly type = 'RA6';
  constructor(public fileId: String, public increaseSize: number) {}
}
