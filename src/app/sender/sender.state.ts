import { Injectable } from '@angular/core';
import {
  Action,
  NgxsOnInit, State,
  StateContext,
  Store
} from '@ngxs/store';
import { SignalingSenderService } from '@services/signaling-sender.service';
import { AccessChannelAction } from '@shared/app.action';
import { _TInstanceState } from '@shared/app.model';
import { AppSelectors } from '@shared/app.selector';
import { Debugger } from '@shared/debug.decorator';
import { SharedAppService } from '@shared/shared-app.service';
import produce from 'immer';
import { cloneDeep } from 'lodash';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SetCurrentStepAction } from '../receiver/receiver.action';
import { ReceiverStateModel } from '../receiver/receiver.state';
import {
  AppendFilesAction,
  CannotConnectToPeer,
  CloseSenderDataChannelAction,
  DeleteFilesAction,
  InitializeChannelAction,
  SendDataAction,
  SenderResetStateToDefaultAction,
  UpdateDataChannelStateAction,
  UpdateFileIdAction,
  UpdateFileSendingCompletedAction,
  UpdateFileSendingProgressAction,
  UpdateSenderStatusAction
} from './sender.action';

const defaultState: SenderStateModel = {
  connectingPeerId: null,
  localFiles: [],
  peersCompleted: {},
  steps: [
    { state: 'normal', disable: false, name: 'Ready' },
    { state: 'normal', disable: true, name: 'Initialize' },
    { state: 'normal', disable: true, name: 'Seeding' },
  ],
  currentStep: -1,
  dataChannelState: 'closed',
}

interface _SenderStateModel extends _TInstanceState {
  steps: {
    state: 'normal' | 'pass' | 'error';
    disable: boolean;
    name: string;
  }[];
  currentStep: number;
}
export interface SenderStateModel extends Partial<_SenderStateModel> {}

@State<SenderStateModel>({
  name: 'senderState',
  defaults: cloneDeep(defaultState),
})
@Injectable()
export class SenderState implements NgxsOnInit {
  constructor(
    private commonService: SharedAppService,
    private signalingService: SignalingSenderService,
    private store: Store
  ) {}

  /**
   * on state init
   * @param ctx
   */
  ngxsOnInit(ctx?: StateContext<SenderStateModel>) {}

  /**
   * Reset state to default
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(SenderResetStateToDefaultAction)
  resetToDefault(
    ctx: StateContext<SenderStateModel>,
    action: SenderResetStateToDefaultAction
  ) {
    ctx.setState(cloneDeep(defaultState));
  }


  /**
   * STEP 2 Initialize Signaling Channel
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(InitializeChannelAction)
  initializeChannel(
    ctx: StateContext<SenderStateModel>,
    action: InitializeChannelAction
  ) {
    const state = ctx.getState();
    const peerId = this.store.selectSnapshot(AppSelectors.getPeerId);

    const files = state.localFiles.map((file) => {
      return { fileId: file.fileId, totalPart: file.totalPart };
    });
    this.setCurrentStep(ctx, new SetCurrentStepAction(1));

    this.signalingService
      .initializeSignalingChannel(peerId)
      .pipe(
        tap((res) => {
          if (res) {
            this.store.dispatch(
              new AccessChannelAction(res.channelId, res.accessKey)
            );
          }
        }),
        switchMap((res) => {
          // Register all the file to the server
          const fileRegister$ = files.map((file) => {
            return this.signalingService.registerFile(
              res.channelId,
              file.totalPart
            );
          });
          return forkJoin(fileRegister$);
        })
      )
      .subscribe((fileParts) => {
        // Mapping local FileId with the file Id get from server
        fileParts.forEach((filePart, index) => {
          ctx.dispatch(
            new UpdateFileIdAction(files[index].fileId, filePart.fileId)
          );
        });
        this.signalingService.selectedFiles$.next(ctx.getState().localFiles);

        this.setCurrentStep(ctx, new SetCurrentStepAction(2));
      });
  }

  /**
   * When user select more file, append it into list
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(AppendFilesAction)
  addFiles(ctx: StateContext<SenderStateModel>, action: AppendFilesAction) {
    ctx.setState(
      produce((draft) => {
        if (
          draft.localFiles.length === 1 &&
          draft.localFiles[0].fileId === null
        ) {
          draft.localFiles = [];
        }
        const files = [...draft.localFiles, ...action.files];
        draft.localFiles = files.slice(-3);
      })
    );
  }

  /**
   * Clean selected file
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(DeleteFilesAction)
  deleteFile(ctx: StateContext<SenderStateModel>, action: DeleteFilesAction) {
    ctx.setState(
      produce((draft) => {
        let tmpList = draft.localFiles.filter(
          (val, index) => index != action.fileIndex
        );
        draft.localFiles = tmpList;
      })
    );
  }

  /**
   * Set current step
   * The STEP display in the layout 1 / 2 /3
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(SetCurrentStepAction)
  setCurrentStep(
    ctx: StateContext<SenderStateModel>,
    action: SetCurrentStepAction
  ) {
    ctx.setState(
      produce((draft) => {
        const tep = draft.currentStep;
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
   * Update file progress during sending
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(UpdateFileSendingProgressAction)
  updateFileProgress(
    ctx: StateContext<SenderStateModel>,
    action: UpdateFileSendingProgressAction
  ) {
    const state = ctx.getState();
    ctx.setState(
      produce((draft) => {
        const idx = draft.localFiles.findIndex(
          (file) => file.fileId === action.fileId
        );
        if (idx >= 0) {
          const currentSize: number = draft.localFiles[idx].currentSize;
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
   * Update status after a peer get file completed
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(UpdateFileSendingCompletedAction)
  updateFileSendingComplete(
    ctx: StateContext<SenderStateModel>,
    action: UpdateFileSendingCompletedAction
  ) {
    const state = ctx.getState();
    ctx.setState(
      produce((draft) => {
        const idx = draft.localFiles.findIndex(
          (file) =>
            file.fileId === action.fileId && file.index === action.filePart
        );
        if (idx >= 0) {
          if (!draft.peersCompleted.hasOwnProperty(action.peerId)) {
            draft.peersCompleted[action.peerId] = [];
          }
          const hash = draft.peersCompleted[action.peerId] || ([] as string[]);
          hash.push(action.fileId + '-' + action.filePart);

          draft.peersCompleted[action.peerId] = hash;
        }
      })
    );
  }

  /**
   * Update file id
   * When selected in the browser, they were set a local @fileId
   * After synchronizing with the backend, they use @fileIds from the backend ( to make sure every peer understand the same Ids)
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(UpdateFileIdAction)
  updateFileId(
    ctx: StateContext<SenderStateModel>,
    action: UpdateFileIdAction
  ) {
    ctx.setState(
      produce((draft) => {
        const idx = draft.localFiles.findIndex(
          (file) => file.fileId === action.fileId
        );
        if (idx >= 0) {
          draft.localFiles[idx].fileId = action.newFileId;
        }
      })
    );
  }

  /**
   * Action handle case cannot connect
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(CannotConnectToPeer)
  cannotConnectToPeer(
    ctx: StateContext<SenderStateModel>,
    action: CannotConnectToPeer
  ) {
    this.commonService.showNotify(
      'Your friend was disconnected ! \nWait until he reconnect!',
      'Error'
    );
  }

  /**
   * WebRTC data channel state was updated
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(UpdateDataChannelStateAction)
  updateDataChannelState(
    ctx: StateContext<SenderStateModel>,
    action: UpdateDataChannelStateAction
  ) {
    ctx.getState();
    ctx.setState(
      produce((draft) => {
        draft.dataChannelState = action.state;
      })
    );
  }

  /**
   * Start send data (FilePart) when  WebRTC data channel state == 'open'
   * @param ctx
   * @param action
   */
  @Debugger
  @Action(SendDataAction)
  sendData(ctx: StateContext<SenderStateModel>, action: SendDataAction) {
    this.signalingService.sendData();
  }

  @Debugger
  @Action(UpdateSenderStatusAction)
  updatePeerStatus(
    ctx: StateContext<ReceiverStateModel>,
    action: UpdateSenderStatusAction
  ) {
    const peerId = this.store.selectSnapshot(AppSelectors.getPeerId);
    this.signalingService
      .updatePeerStatus(peerId, action.peerState, action.fileId)
      .subscribe();
  }

  @Debugger
  @Action(CloseSenderDataChannelAction)
  closeDataChannelAction(
    ctx: StateContext<ReceiverStateModel>,
    action: CloseSenderDataChannelAction
  ) {
    this.signalingService.closeDataChannels();
  }
}
