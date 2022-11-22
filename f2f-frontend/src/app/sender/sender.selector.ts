import { Selector } from '@ngxs/store';
import { SenderState, SenderStateModel } from './sender.state';

export class SenderSelectors {
  @Selector([SenderState])
  static getAllStep(state: SenderStateModel) {
    return state.steps;
  }

  @Selector([SenderState])
  static getCurrentStep(state: SenderStateModel) {
    return state.currentStep;
  }

  @Selector([SenderState])
  static getLocalFiles(state: SenderStateModel) {
    return state.localFiles.filter((file) => file.fileId !== null);
  }

  @Selector([SenderState])
  static getDataChannelState(state: SenderStateModel) {
    return state.dataChannelState;
  }

  @Selector([SenderState])
  static isAllReceiverDone(state: SenderStateModel) {
    const peersCompleted = state.peersCompleted;
    for (let peerId in peersCompleted) {
      const files = peersCompleted[peerId];
      if (files.length < state.localFiles.length) {
        return false;
      }
    }
    return state.localFiles.length > 0 && Object.keys(peersCompleted).length > 0;
  }
}
