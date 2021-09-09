import { IFileSending } from '../app.model';

export class InitChanelAction {
  static readonly type = 'SA1';
  constructor() {}
}

export class DeleteFilesAction {
  static readonly type = 'SA2_1';
  constructor(public fileIndex: number) {}
}

export class AppendFilesAction {
  static readonly type = 'SA2';
  constructor(public files: IFileSending[]) {}
}

export class SenderResetStateToDefaultAction {
  static readonly type = 'SA3';
  constructor() {}
}

export class UpdateFileSenderProgressAction {
  static readonly type = 'SA4';
  constructor(public fileId: String, public increaseSize: number) {}
}


export class CannotConnectToPeer {
  static readonly type = 'SA45';
  constructor(public fileId: String) {}
}
