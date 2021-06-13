import { Selector } from '@ngxs/store';
import { SenderState, SenderStateModel } from './sender.state';

export class SenderSelectors {

  @Selector([SenderState])
  static isReadyToSend(state: SenderStateModel) {
    return !!state.channelId && !!state.accessKey;
  }

  @Selector([SenderState])
  static localId(state: SenderStateModel) {
    return state.localId;
  }

  @Selector([SenderState])
  static steps(state: SenderStateModel) {
    return state.steps;
  }

  @Selector([SenderState])
  static currentStep(state: SenderStateModel) {
    return state.currentStep;
  }

  @Selector([SenderState])
  static channelId(state: SenderStateModel) {
    return state.channelId;
  }

  @Selector([SenderState])
  static accessKey(state: SenderStateModel) {
    return state.accessKey;
  }

  @Selector([SenderState])
  static localFiles(state: SenderStateModel) {
    return state.localFiles.filter((file) => file.fileId !== '-1');
  }
}
