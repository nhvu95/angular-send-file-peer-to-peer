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
  private _rxMessage$: Observable<IMessage>;

  constructor(private store: Store, private rxStompService: RxStompService) {
    this.store.select(AppSelectors.getPeerId).subscribe((peerId) => {
      if (peerId) {
        this._rxMessage$ = this.rxStompService
          .watch(`PEERS.${peerId}`)
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
   * Subcribe Signaling Channel (ActiveMQ)
   * @returns 
   */
  getRxMessage$(): Observable<IMessage> {
    return this._rxMessage$;
  }

  /**
   * Send an message through Signaling Channel (ActiveMQ)
   * @param message 
   * @param connectingPeerId 
   */
  publish(message: ISignalingMessage, connectingPeerId: number) {
    console.log(`SEND message ${message.content} to ${message.to}`, message.data);
    this.rxStompService.publish({
      destination: `PEERS.${connectingPeerId}`,
      body: JSON.stringify(message),
    });
  }
}
