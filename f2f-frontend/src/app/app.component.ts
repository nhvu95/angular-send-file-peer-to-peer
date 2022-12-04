import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ClipboardService } from 'ngx-clipboard';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppSelectors } from '@shared/app.selector';
import { SharedAppService } from '@shared/shared-app.service';

@Component({
  selector: 'et-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'webrtc';
  @Select(AppSelectors.isReadyToSend) readyToSend$: Observable<boolean>;
  isSender$: Observable<boolean> = of(false);
  notClickCopy = true;

  activeItemIndex = 0;

  constructor(
    private router: Router,
    private store: Store,
    private ngxCopy: ClipboardService,
    private commonService: SharedAppService
  ) {
    this.isSender$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url === '/' || e.url === 'sender')
    );

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  /**
   * Copy data from state to buffer
   */
  copyData(): void {
    this.notClickCopy = false;
    const channelId = this.store.selectSnapshot<string>(
      AppSelectors.getChannelId
    );
    const accessKey = this.store.selectSnapshot<string>(
      AppSelectors.getAccessKey
    );
    this.ngxCopy.copy(channelId + '\n' + accessKey);
  }

  /**
   * Copy Link
   */
  copyLink(): void {
    this.notClickCopy = false;
    this.commonService.showNotify(
      'Copy link success\nDon\'t close this tab until your friend downloads complete',
      'Attention'
    );
    const channelId = this.store.selectSnapshot<string>(
      AppSelectors.getChannelId
    );
    const accessKey = this.store.selectSnapshot<string>(
      AppSelectors.getAccessKey
    );

    const href = window.location.href;
    const idx = href.lastIndexOf('/');
    const url = href.substring(0, idx);
    const finalContent = `${url}/receiver?channelId=${channelId}&accessKey=${accessKey}`;
    this.ngxCopy.copy(finalContent);
  }
}
