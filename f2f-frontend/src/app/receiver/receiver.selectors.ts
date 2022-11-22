import { Selector } from '@ngxs/store';
import { ReceiverState, ReceiverStateModel } from './receiver.state';

export class ReceiverSelectors {

  @Selector([ReceiverState])
  static steps(state: ReceiverStateModel) {
    return state.steps;
  }

  @Selector([ReceiverState])
  static currentStep(state: ReceiverStateModel) {
    return state.currentStep;
  }

  @Selector([ReceiverState])
  static localFiles(state: ReceiverStateModel) {
    return state.localFiles;
  }

  @Selector([ReceiverState])
  static localFilesComplete(state: ReceiverStateModel) {
    return state.localFiles.filter(file => file.currentSize === file.fileSize);
  }
}
