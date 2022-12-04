import { Selector } from '@ngxs/store';
import { ReceiverState, ReceiverStateModel } from './receiver.state';
import {IFilePartSending, ISteps} from '@shared/app.model';

export class ReceiverSelectors {

  @Selector([ReceiverState])
  static steps(state: ReceiverStateModel): ISteps[] {
    return state.steps;
  }

  @Selector([ReceiverState])
  static currentStep(state: ReceiverStateModel): number {
    return state.currentStep;
  }

  @Selector([ReceiverState])
  static localFiles(state: ReceiverStateModel): IFilePartSending[] {
    return state.localFiles;
  }

  @Selector([ReceiverState])
  static localFilesComplete(state: ReceiverStateModel): IFilePartSending[] {
    return state.localFiles.filter(file => file.currentSize === file.fileSize);
  }
}
