import { Selector } from '@ngxs/store';
import { ReceiverStateModel } from './receiver.state';
import { ReceiverState } from './receiver.state';

export class ReceiverSelectors {
  @Selector([ReceiverState])
  static localId(state: ReceiverStateModel) {
    return state.localId;
  }

  @Selector([ReceiverState])
  static steps(state: ReceiverStateModel) {
    return state.steps;
  }

  @Selector([ReceiverState])
  static currentStep(state: ReceiverStateModel) {
    return state.currentStep;
  }

  @Selector([ReceiverState])
  static chanelId(state: ReceiverStateModel) {
    return state.channelId;
  }

  @Selector([ReceiverState])
  static accessKey(state: ReceiverStateModel) {
    return state.accessKey;
  }

  @Selector([ReceiverState])
  static localFiles(state: ReceiverStateModel) {
    return state.localFiles;
  }
}
