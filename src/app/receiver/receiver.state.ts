import {
  ApplicationRef,
  ChangeDetectorRef,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { IInitChanelReqDTO, _TInstanceState } from '../app.model';
import {
  AppendFilesAction,
  AccessChanelAction,
  SetCurrentStepAction,
  StartLeechingAction,
} from './receiver.action';
import { v1 as uuidv1 } from 'uuid';
import { SignalingReceiver } from '../services/signaling-receiver.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../services/common.service';

interface _ReceiverStateModel extends Partial<_TInstanceState> {
  accessKey: string;
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
  defaults: {
    channelId: '',
    accessKey: '',
    localId: '',
    peerId: '',
    localFiles: [],
    peerFiles: [],
    steps: [
      { state: 'normal', disable: false, name: 'Ready' },
      { state: 'normal', disable: true, name: 'Leeching' },
      { state: 'normal', disable: true, name: 'Seeding' },
    ],
    currentStep: -1,
  },
})
@Injectable()
export class ReceiverState {
  signalingService: SignalingReceiver;
  constructor(
    private injector: Injector,
    private commonService: CommonService
  ) {}

  ngxsOnInit(ctx?: StateContext<ReceiverStateModel>) {
    let localId = localStorage.getItem('localId');
    if (!localId) {
      localId = 'p' + uuidv1().replace(/\-/g, '_');
      localStorage.setItem('localId', localId);
    }
    ctx.setState(
      produce((draft: ReceiverStateModel) => {
        draft.localId = localId;
      })
    );
  }

  @Action(AccessChanelAction)
  accessChanel(
    ctx: StateContext<ReceiverStateModel>,
    action: AccessChanelAction
  ) {
    ctx.setState(
      produce((draft) => {
        draft.channelId = action.chanelId;
        draft.accessKey = action.accessKey;
      })
    );
  }

  @Action(SetCurrentStepAction)
  setCurrentSate(
    ctx: StateContext<ReceiverStateModel>,
    action: SetCurrentStepAction
  ) {
    const state = ctx.getState();

    this.signalingService = this.injector.get(SignalingReceiver);
    this.signalingService.setLocalIdAndStartListenMessage(state.localId);

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

  @Action(StartLeechingAction)
  startLeeching(ctx: StateContext<ReceiverStateModel>) {
    const self = this;
    const state = ctx.getState();
    console.log('startLeeching');

    // Get next peer
    // Step 1
    this.signalingService.getNextPartInformation(state.channelId).subscribe(
      (res) => {
        if (res) {
          const senderId = res.peerId;
          ctx.setState(
            produce((draft) => {
              draft.peerId = senderId;
            })
          );
          self.signalingService.setRemoteId(senderId);
          // Step 2
          self.signalingService.preflightToSender(res.fileId, res.partId);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
