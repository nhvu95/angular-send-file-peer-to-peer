import { IFileSending } from '../app.model';

export class AccessChanelAction {
  static readonly type = 'AccessChanel';
  constructor(public chanelId: string, public accessKey: string) {}
}

export class AppendFilesAction {
  static readonly type = 'add file action';
  constructor(public files: IFileSending[]) {}
}

export class SetCurrentStepAction {
  static readonly type = 'Set current step';
  constructor(public step: number) {}
}

export class StartLeechingAction {
  static readonly type = 'Start leeching';
  constructor() {}
}

