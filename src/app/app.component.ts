import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ClipboardService } from 'ngx-clipboard';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SenderSelectors } from './sender/sender.selectors';

@Component({
  selector: 'et-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'webrtc';
  @Select(SenderSelectors.isReadyToSend) readyToSend$: Observable<boolean>;
  isSender$: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private store: Store,
    private ngxCopy: ClipboardService
  ) {
    this.isSender$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url === '/' || e.url === 'sender')
    );

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
    });

  }
  copyData() {
    const channelId = this.store.selectSnapshot<String>(
      SenderSelectors.channelId
    );
    const accessKey = this.store.selectSnapshot<String>(
      SenderSelectors.accessKey
    );
    this.ngxCopy.copy(channelId + '\n' + accessKey);
  }
  copyLink() {
    const channelId = this.store.selectSnapshot<String>(
      SenderSelectors.channelId
    );
    const accessKey = this.store.selectSnapshot<String>(
      SenderSelectors.accessKey
    );

    const href = window.location.href;
    const idx = href.lastIndexOf("/");
    const url = href.substring(0, idx);
    const finalContent = `${url}/receiver?channelId=${channelId}&accessKey=${accessKey}`;
    console.log('copyLink', finalContent);
    this.ngxCopy.copy(finalContent);
  }
}
