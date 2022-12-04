import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SignalingReceiverService } from '@services/signaling-receiver.service';
import {EPeerState, _TInstanceState, ISteps, IFilePartSending} from '@shared/app.model';
import { AppSelectors } from '@shared/app.selector';
import { Debugger } from '@shared/debug.decorator';
import { SharedAppService } from '@shared/shared-app.service';
import produce from 'immer';
import { cloneDeep } from 'lodash';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AddNewFileInfoAction,
  CloseReceiverDataChannelAction,
  DownloadFilePartCompleteAction,
  GetChannelOwnerAndListFileAction,
  ReceiverResetStateToDefaultAction,
  SetCurrentStepAction,
  StartLeechingAction,
  TryToGettingFile,
  UpdateFileReceiveProgressAction,
  UpdateReceiverStatusAction
} from './receiver.action';
import { ReceiverSelectors } from './receiver.selectors';

const defaultState: ReceiverStateModel = {
  connectingPeerId: null,
  localFiles: [],
  peersCompleted: {},
  steps: [
    { state: 'normal', disable: false, name: 'Ready' },
    { state: 'normal', disable: true, name: 'Connecting' },
    { state: 'normal', disable: true, name: 'Leeching' },
  ],
  currentStep: -1,
};

// tslint:disable-next-line:class-name
interface _ReceiverStateModel extends Partial<_TInstanceState> {
  steps: ISteps[];
  currentStep: number;
}

export interface ReceiverStateModel extends Partial<_ReceiverStateModel> {}

@State<ReceiverStateModel>({
  name: 'receiverState',
  defaults: cloneDeep(defaultState),
})
@Injectable()
export class ReceiverState {
  constructor(
    private signalingService: SignalingReceiverService,
    private commonService: SharedAppService,
    private router: Router,
    private store: Store
  ) {}

  /**
   * On state management initialize
   * @param ctx state context
   */
  ngxsOnInit(ctx?: StateContext<ReceiverStateModel>): void{}

  /**
   * Reset state to default
   * @param ctx state context
   * @param action object instance of ReceiverResetStateToDefaultAction
   */
  @Debugger
  @Action(ReceiverResetStateToDefaultAction)
  resetToDefault(
    ctx: StateContext<ReceiverStateModel>,
    action: ReceiverResetStateToDefaultAction
  ): void {
    ctx.setState(cloneDeep(defaultState));
  }

  /**
   * @UI set current step
   * @param ctx state context
   * @param action object instance of SetCurrentStepAction
   */
  @Debugger
  @Action(SetCurrentStepAction)
  setCurrentStep(
    ctx: StateContext<ReceiverStateModel>,
    action: SetCurrentStepAction
  ): void {
    if (action.step === 3) {
      this.commonService
        .showNotifyAskUserConfirm('Download complete!')
        .pipe(
          tap((res) => {
            action.step = -1;
          }),
          takeUntil(this.router.events)
        )
        .subscribe((res) => {
          this.router.navigateByUrl('/').then((_) => {
            window.location.reload();
          });
        });
    }
    ctx.setState(
      produce((draft) => {
        draft.currentStep = action.step;
        draft.steps = draft.steps.map((step, idx) => {
          if (idx < action.step) {
            step.state = 'pass';
            step.disable = true;
          }
          if (idx > action.step) {
            step.state = 'normal';
            step.disable = true;
          }
          return step;
        });
      })
    );
    // Get next peer
  }

  /**
   * Add files into list
   * @param ctx state context
   * @param action object instance of AddNewFileInfoAction
   */
  @Debugger
  @Action(AddNewFileInfoAction)
  addFiles(
    ctx: StateContext<ReceiverStateModel>,
    action: AddNewFileInfoAction
  ): void {
    ctx.setState(
      produce((draft) => {
        if (
          draft.localFiles.findIndex((file) => {
            return file.fileId === action.file.fileId;
          }) === -1
        ) {
          draft.localFiles.push({ ...action.file });
        }
      })
    );
  }

  /**
   * Get Channel Owner and get list of file
   * @param ctx state context
   */
  @Debugger
  @Action(GetChannelOwnerAndListFileAction)
  getChannelOwnerAndListFile(ctx: StateContext<ReceiverStateModel>): void {
    const channelId = this.store.selectSnapshot(AppSelectors.getChannelId);
    this.signalingService.getChannelOwner(channelId).subscribe(ownerId => {
      this.signalingService.sendGetListFilesMsg(ownerId);
    });
  }

  /**
   * Start getting file (leeching file)
   * @param ctx state context
   */
  @Debugger
  @Action(StartLeechingAction)
  startLeeching(ctx: StateContext<ReceiverStateModel>): void {
    this.setCurrentStep(ctx, new SetCurrentStepAction(1));
    ctx.dispatch(new TryToGettingFile());
  }

  /**
   * Try to get a file
   * @param ctx state context
   */
  @Debugger
  @Action(TryToGettingFile)
  tryToGettingFileRegistedInChannel(ctx: StateContext<ReceiverStateModel>): void {
    const self = this;
    const channelId = this.store.selectSnapshot(AppSelectors.getChannelId);
    // Step 1
    this.signalingService.getNextPartInformation(channelId).subscribe(
      (res) => {
        if (res) {
          const senderId = res.ownerId;
          ctx.setState(
            produce((draft) => {
              draft.connectingPeerId = senderId;
            })
          );
          self.signalingService.setConnectingId(senderId);
          // Step 2
          self.signalingService.sendPreflightMsg(res.fileId, res.index);
          this.setCurrentStep(ctx, new SetCurrentStepAction(2));
        } else {
          this.store.dispatch(new SetCurrentStepAction(3));
        }
      },
      (err: HttpErrorResponse) => {
        this.store.dispatch(new SetCurrentStepAction(3));
      }
    );
  }

  /**
   * Update @UI file progress
   * @param ctx state context
   * @param action instance of UpdateFileReceiveProgressAction
   */
  @Debugger
  @Action(UpdateFileReceiveProgressAction)
  updateFileProgress(
    ctx: StateContext<ReceiverStateModel>,
    action: UpdateFileReceiveProgressAction
  ): void {
    const state = ctx.getState();
    ctx.setState(
      produce((draft) => {
        const idx = draft.localFiles.findIndex(
          (file) => file.fileId === action.fileId
        );
        if (idx >= 0) {
          // tslint:disable-next-line:no-bitwise
          const currentSize: number = draft.localFiles[idx].currentSize | 0;
          draft.localFiles[idx].currentSize = currentSize + action.increaseSize;
          // prettier-ignore
          if ( draft.localFiles[idx].currentSize >= draft.localFiles[idx].fileSize ) {
            draft.localFiles[idx].currentSize = draft.localFiles[idx].fileSize;
          }
        }
      })
    );
  }

  /**
   * Update peer status to manages in server
   * @param ctx state context
   * @param action instance of UpdateReceiverStatusAction
   */
  @Debugger
  @Action(UpdateReceiverStatusAction)
  updatePeerStatus(
    ctx: StateContext<ReceiverStateModel>,
    action: UpdateReceiverStatusAction
  ): void {
    const peerId = this.store.selectSnapshot(AppSelectors.getPeerId);
    this.signalingService
      .updatePeerStatus(peerId, action.peerState, action.fileId)
      .subscribe();

    const completedFiles = this.store.selectSnapshot(
      ReceiverSelectors.localFilesComplete
    );
    if (
      action.peerState === EPeerState.IDLE &&
      completedFiles.length === ctx.getState().localFiles.length
    ) {
    }
  }

  /**
   * On download file part complete
   * @note : From update v20112022 we have only 1 part with index 0
   * @param ctx state context
   * @param action instance of DownloadFilePartCompleteAction
   */
  @Debugger
  @Action(DownloadFilePartCompleteAction)
  downloadFilePartComplete(
    ctx: StateContext<ReceiverStateModel>,
    action: DownloadFilePartCompleteAction
  ): void {
    const state = ctx.getState();
    const channelId = this.store.selectSnapshot(AppSelectors.getChannelId);
    const file = state.localFiles.find((mfile: IFilePartSending) => mfile.fileId === action.fileId);
    this.signalingService
      .gettingPartComplete(
        channelId,
        file.fileId,
        action.fileIndex,
        file.totalPart
      )
      .subscribe((res) => {
        const doneFile = state.localFiles.find(mfile => mfile.currentSize !== mfile.fileSize);
        if (doneFile) {
          ctx.dispatch(new TryToGettingFile());
        }
      });
  }

  /**
   * Close data channel
   * @param ctx state context
   * @param action instance of CloseReceiverDataChannelAction
   */
  @Debugger
  @Action(CloseReceiverDataChannelAction)
  closeDataChannelAction(
    ctx: StateContext<ReceiverStateModel>,
    action: CloseReceiverDataChannelAction
  ): void {
    this.signalingService.closeDataChannels();
  }
}
