import { Selector } from '@ngxs/store';
import { RxStompState } from './app.model';
import { AppState, AppStateModel } from './app.state';

export class AppSelectors {
  @Selector([AppState])
  static getScreen(state: AppStateModel) {
    return state.screen;
  }

  @Selector([AppState])
  static getPeerId(state: AppStateModel) {
    return state.peerId;
  }

  @Selector([AppState])
  static getChannelId(state: AppStateModel) {
    return state.channelId;
  }

  @Selector([AppState])
  static getAccessKey(state: AppStateModel) {
    return state.accessKey;
  }

  @Selector([AppState])
  static isReadyToSend(state: AppStateModel) {
    return !!state.channelId && !!state.accessKey && state.screen == 'sender';
  }

  @Selector([AppState])
  static isReadyToReceive(state: AppStateModel) {
    return (
      !!state.peerId &&
      !!state.channelId &&
      !!state.accessKey &&
      state.screen == 'receiver' &&
      state.rxStompState === RxStompState.OPEN
    );
  }
}
