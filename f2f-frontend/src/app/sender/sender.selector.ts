import { Selector } from '@ngxs/store';
import { SenderState, SenderStateModel } from './sender.state';
import {IFilePartSending, ISteps} from '@shared/app.model';

export class SenderSelectors {
  @Selector([SenderState])
  static getAllStep(state: SenderStateModel): ISteps[] {
    return state.steps;
  }

  @Selector([SenderState])
  static getCurrentStep(state: SenderStateModel): number {
    return state.currentStep;
  }

  @Selector([SenderState])
  static getLocalFiles(state: SenderStateModel): IFilePartSending[] {
    return state.localFiles.filter((file: IFilePartSending) => file.fileId !== null);
  }

  @Selector([SenderState])
  static getDataChannelState(state: SenderStateModel): RTCDataChannelState {
    return state.dataChannelState;
  }

  @Selector([SenderState])
  static isAllReceiverDone(state: SenderStateModel): boolean {
    const peersCompleted = state.peersCompleted;
    for (const peerId in peersCompleted) {
      if (peersCompleted[peerId].length < state.localFiles.length) {
        return false;
      }
    }
    return state.localFiles.length > 0 && Object.keys(peersCompleted).length > 0;
  }
}
