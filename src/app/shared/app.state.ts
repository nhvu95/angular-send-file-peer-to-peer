import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import {
  AccessChannelAction,
  SetPeerIdAction,
  SetRxConnectStateAction,
  SetScreenAction,
} from './app.action';
import { RxStompState } from './app.model';
import { Debugger } from './debug.decorator';

interface _AppStateModel {
  screen: 'sender' | 'receiver';
  peerId: number;
  accessKey: string;
  channelId: string;
  rxStompState: RxStompState;
}

export interface AppStateModel extends Partial<_AppStateModel> {}

@State<AppStateModel>({
  name: 'appState',
  defaults: {},
})
@Injectable()
export class AppState {
  constructor(private store: Store) {}

  @Debugger
  @Action(SetPeerIdAction)
  setPeerId(ctx: StateContext<AppStateModel>, action: SetPeerIdAction) {
    ctx.setState(
      produce((draft) => {
        draft.peerId = action.peerId;
      })
    );
  }

  @Debugger
  @Action(AccessChannelAction)
  setChannelId(ctx: StateContext<AppStateModel>, action: AccessChannelAction) {
    ctx.setState(
      produce((draft) => {
        draft.channelId = action.channelId;
        draft.accessKey = action.accessKey;
      })
    );
  }

  @Debugger
  @Action(SetScreenAction)
  setScreen(ctx: StateContext<AppStateModel>, action: SetScreenAction) {
    ctx.setState(
      produce((draft) => {
        draft.screen = action.screen;
      })
    );
  }

  @Debugger
  @Action(SetRxConnectStateAction)
  setRxConnectStateAction(ctx: StateContext<AppStateModel>, action: SetRxConnectStateAction) {
    ctx.setState(
      produce((draft) => {
        draft.rxStompState = action.state;
      })
    );
  }
}
