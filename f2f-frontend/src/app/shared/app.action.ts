import { RxStompState } from './app.model';

export class SetScreenAction {
  static readonly type = '[APP] Set screen';
  constructor(public screen: 'receiver' | 'sender') {}
}

export class SetPeerIdAction {
  static readonly type = '[APP] Set peer Id';
  constructor(public peerId: number) {}
}

export class AccessChannelAction {
  static readonly type = '[APP] Access channel';
  constructor(public channelId: string, public accessKey: string) {}
}

export class SetRxConnectStateAction {
  static readonly type = '[APP] RxConnectReady';
  constructor(public state: RxStompState) {}
}
