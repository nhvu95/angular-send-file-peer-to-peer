import { IFileInformation, IFileSending } from '../app.model';

export class AccessChanelAction {
  static readonly type = 'Receiver AccessChanel';
  constructor(public chanelId: string, public accessKey: string) {}
}

export class AddNewFileInfoAction {
  static readonly type = 'Receiver Add new file action';
  constructor(public file: IFileInformation) {}
}

export class SetCurrentStepAction {
  static readonly type = 'Receiver Set current step';
  constructor(public step: number) {}
}

export class StartLeechingAction {
  static readonly type = 'Receiver Start leeching';
  constructor() {}
}

