import { IFileSending } from '../app.model';

export class InitChanelAction {
  static readonly type = 'Init chanel';
  constructor() {}
}

export class AppendFilesAction {
  static readonly type = 'add file action';
  constructor(public files: IFileSending[]) {}
}
