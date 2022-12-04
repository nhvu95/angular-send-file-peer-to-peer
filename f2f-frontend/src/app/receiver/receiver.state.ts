import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SignalingReceiverService } from '@services/signaling-receiver.service';
import { EPeerState, _TInstanceState } from '@shared/app.model';
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
}

interface _ReceiverStateModel extends Partial<_TInstanceState> {
  steps: {
    state: 'normal' | 'pass' | 'error';
    disable: boolean;
    name: string;
  }[];
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

  ngxsOnInit(ctx?: StateContext<ReceiverStateModel>) {}

  @Debugger
  @Action(ReceiverResetStateToDefaultAction)
  resetToDefault(
    ctx: StateContext<ReceiverStateModel>,
    action: ReceiverResetStateToDefaultAction
  ) {
    ctx.setState(cloneDeep(defaultState));
  }

  /**
   * @UI set current step
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(SetCurrentStepAction)
  setCurrentStep(
    ctx: StateContext<ReceiverStateModel>,
    action: SetCurrentStepAction
  ) {
    if (action.step == 3) {
      this.commonService
        .showNotifyAskUserConfirm('Download complete!')
        .pipe(
          tap((res) => {
            action.step = -1;
          }),
          takeUntil(this.router.events)
        )
        .subscribe((res) => {
          this.router.navigateByUrl('/').then((res) => {
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

  @Debugger
  @Action(AddNewFileInfoAction)
  addFiles(
    ctx: StateContext<ReceiverStateModel>,
    action: AddNewFileInfoAction
  ) {
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
   * @param ctx
   */
  @Debugger
  @Action(GetChannelOwnerAndListFileAction)
  getChannelOwnerAndListFile(ctx: StateContext<ReceiverStateModel>) {
    const channelId = this.store.selectSnapshot(AppSelectors.getChannelId);
    this.signalingService.getChannelOwner(channelId).subscribe(ownerId => {
      this.signalingService.sendGetListFilesMsg(ownerId);
    });
  }

  /**
   * Start getting file (leeching file)
   * @param ctx
   */
  @Debugger
  @Action(StartLeechingAction)
  startLeeching(ctx: StateContext<ReceiverStateModel>) {
    this.setCurrentStep(ctx, new SetCurrentStepAction(1));
    ctx.dispatch(new TryToGettingFile());
  }

  /**
   * Try to getting a file
   * @param ctx
   */
  @Debugger
  @Action(TryToGettingFile)
  tryToGettingFileRegistedInChannel(ctx: StateContext<ReceiverStateModel>) {
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
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(UpdateFileReceiveProgressAction)
  updateFileProgress(
    ctx: StateContext<ReceiverStateModel>,
    action: UpdateFileReceiveProgressAction
  ) {
    const state = ctx.getState();
    ctx.setState(
      produce((draft) => {
        const idx = draft.localFiles.findIndex(
          (file) => file.fileId === action.fileId
        );
        if (idx >= 0) {
          const currentSize: number = draft.localFiles[idx].currentSize | 0;
          draft.localFiles[idx].currentSize = currentSize + action.increaseSize;
          //prettier-ignore
          if ( draft.localFiles[idx].currentSize >= draft.localFiles[idx].fileSize ) {
            draft.localFiles[idx].currentSize = draft.localFiles[idx].fileSize;
          }
        }
      })
    );
  }

  /**
   * Update peer status to manages in server
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(UpdateReceiverStatusAction)
  updatePeerStatus(
    ctx: StateContext<ReceiverStateModel>,
    action: UpdateReceiverStatusAction
  ) {
    const peerId = this.store.selectSnapshot(AppSelectors.getPeerId);
    this.signalingService
      .updatePeerStatus(peerId, action.peerState, action.fileId)
      .subscribe();

    const completedFiles = this.store.selectSnapshot(
      ReceiverSelectors.localFilesComplete
    );
    if (
      action.peerState === EPeerState.IDLE &&
      completedFiles.length == ctx.getState().localFiles.length
    ) {
    }
  }

  /**
   * On download file part complete
   * @note : From update v20112022 we have only 1 part with index 0
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(DownloadFilePartCompleteAction)
  downloadFilePartComplete(
    ctx: StateContext<ReceiverStateModel>,
    action: DownloadFilePartCompleteAction
  ) {
    const state = ctx.getState();
    const channelId = this.store.selectSnapshot(AppSelectors.getChannelId);
    const file = state.localFiles.find((file) => file.fileId === action.fileId);
    this.signalingService
      .gettingPartComplete(
        channelId,
        file.fileId,
        action.fileIndex,
        file.totalPart
      )
      .subscribe((res) => {
        const file = state.localFiles.find(file => file.currentSize != file.fileSize);
        if (file) {
          ctx.dispatch(new TryToGettingFile());
        }
      });
  }

  /**
   * Close data channel
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(CloseReceiverDataChannelAction)
  closeDataChannelAction(
    ctx: StateContext<ReceiverStateModel>,
    action: CloseReceiverDataChannelAction
  ) {
    this.signalingService.closeDataChannels();
  }
}
