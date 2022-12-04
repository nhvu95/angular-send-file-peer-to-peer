import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetRxConnectStateAction } from '@shared/app.action';
import { ISignalingMessage, RxStompState } from '@shared/app.model';
import { AppSelectors } from '@shared/app.selector';
import { RxStompService } from '@stomp/ng2-stompjs';
import { IMessage } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RxStompBridgeService {
  // tslint:disable-next-line:variable-name
  private _rxMessage$: Observable<IMessage>;

  constructor(private store: Store, private rxStompService: RxStompService) {
    this.store.select(AppSelectors.getPeerId).subscribe((peerId) => {
      if (peerId) {
        this._rxMessage$ = this.rxStompService
          .watch(`PEERS.B${peerId}`)
          .pipe(share());
      }
    });

    this.rxStompService.connectionState$
      .pipe(
        map((state) => {
          // convert numeric RxStompState to string
          return state as RxStompState;
        })
      )
      .subscribe((res) => {
        console.log('SetRxConnectStateAction', res);
        this.store.dispatch(new SetRxConnectStateAction(res));
      });
  }

  /**
   * Subscribe Signaling Channel (ActiveMQ)
   * @returns Observable<IMessage>
   */
  getRxMessage$(): Observable<IMessage> {
    return this._rxMessage$;
  }

  /**
   * Send a message through Signaling Channel (ActiveMQ)
   * @param message The message
   * @param connectingPeerId peerId of receiver
   */
  publish(message: ISignalingMessage, connectingPeerId: number): void {
    console.log(`SEND message ${message.content} to ${message.to}`, message);
    this.rxStompService.publish({
      destination: `PEERS.B${connectingPeerId}`,
      body: JSON.stringify(message),
    });
  }
}
