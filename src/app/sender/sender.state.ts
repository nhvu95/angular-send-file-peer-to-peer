import { Injectable, Injector } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { v1 as uuidv1 } from 'uuid';
import { _TInstanceState } from '../app.model';
import { SetCurrentStepAction } from '../receiver/receiver.action';
import { CommonService } from '../services/common.service';
import { SignalingSender } from '../services/signaling-sender.service';
import {
  AppendFilesAction,
  CannotConnectToPeer,
  DeleteFilesAction,
  InitChanelAction,
  UpdateFileSenderProgressAction,
} from './sender.action';

interface _SenderStateModel extends _TInstanceState {
  accessKey: string;
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
  defaults: {
    localId: '',
    peerId: '',
    localFiles: [],
    peerFiles: [],
    steps: [
      { state: 'normal', disable: false, name: 'Ready' },
      { state: 'normal', disable: true, name: 'Initialize' },
      { state: 'normal', disable: true, name: 'Seeding' },
    ],
    currentStep: -1,
  },
})
@Injectable()
export class SenderState implements NgxsOnInit {
  signalingService: SignalingSender;
  constructor(
    private injector: Injector,
    private commonService: CommonService
  ) {
    console.log('SenderState init');
  }

  /**
   * on state init
   * @param ctx
   */
  ngxsOnInit(ctx?: StateContext<SenderStateModel>) {
    let localId = localStorage.getItem('localId');
    if (!localId) {
      localId = 'p' + uuidv1().replace(/\-/g, '_');
      localStorage.setItem('localId', localId);
    }
    ctx.setState(
      produce((draft: SenderStateModel) => {
        draft.localId = localId;
      })
    );
  }

  @Action(InitChanelAction)
  initChanel(ctx: StateContext<SenderStateModel>, action: InitChanelAction) {
    const state = ctx.getState();

    this.signalingService = this.injector.get(SignalingSender);
    this.signalingService.localFilesSelector = SenderSelectors.localFiles;
    this.signalingService.setLocalIdAndStartListenMessage(state.localId);

    console.log('Action', action);
    this.setCurrentSate(ctx, new SetCurrentStepAction(1));

    this.signalingService
      .initCoordinatorChanel({
        files: state.localFiles.map((file) => {
          return { fileId: file.fileId, totalPart: file.totalPart };
        }),
        peerId: state.localId,
      })
      .subscribe((res) => {
        if (res) {
          ctx.setState(
            produce((draft) => {
              draft.channelId = res.chanelId;
              draft.accessKey = res.accessKey;
            })
          );
          this.setCurrentSate(ctx, new SetCurrentStepAction(2));

          this.signalingService.dataChannel$.subscribe((res) => {
            if (res) {
              this.signalingService.sendData(state.localFiles[0]);
            }
          });
        }
      });
  }

  @Action(AppendFilesAction)
  addFiles(ctx: StateContext<SenderStateModel>, action: AppendFilesAction) {
    console.log('Action', action);
    ctx.setState(
      produce((draft) => {
        if (
          draft.localFiles.length === 1 &&
          draft.localFiles[0].fileId === '-1'
        ) {
          draft.localFiles = [];
        }
        const files = [...draft.localFiles, ...action.files];
        draft.localFiles = files.slice(-3);
      })
    );
  }

  @Action(DeleteFilesAction)
  deleteFile(ctx: StateContext<SenderStateModel>, action: DeleteFilesAction) {
    console.log('Action', action);
    ctx.setState(
      produce((draft) => {
        let tmpList = draft.localFiles.filter(
          (val, index) => index != action.fileIndex
        );
        draft.localFiles = tmpList;
      })
    );
  }

  @Action(SetCurrentStepAction)
  setCurrentSate(
    ctx: StateContext<SenderStateModel>,
    action: SetCurrentStepAction
  ) {
    const state = ctx.getState();
    console.log('SetCurrentStepAction', action);
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

  @Action(UpdateFileSenderProgressAction)
  updateFileProgress(
    ctx: StateContext<SenderStateModel>,
    action: UpdateFileSenderProgressAction
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
          if ( draft.localFiles[idx].currentSize > draft.localFiles[idx].fileSize ) {
            draft.localFiles[idx].currentSize = draft.localFiles[idx].fileSize;
          }
        }
      })
    );
  }

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
}

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
