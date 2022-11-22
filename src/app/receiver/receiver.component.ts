import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AccessChannelAction, SetScreenAction } from '@shared/app.action';
import { IFilePartSending } from '@shared/app.model';
import { AppSelectors } from '@shared/app.selector';
import { SharedAppService } from '@shared/shared-app.service';
import { TuiStepperComponent } from '@taiga-ui/kit';
import {
  OnDestroyMixin,
  untilComponentDestroyed
} from '@w11k/ngx-componentdestroyed';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { concatMap, debounceTime, tap } from 'rxjs/operators';
import {
  CloseReceiverDataChannelAction,
  GetListFileAction,
  ReceiverResetStateToDefaultAction,
  SetCurrentStepAction,
  StartLeechingAction
} from './receiver.action';
import { ReceiverSelectors } from './receiver.selectors';

@Component({
  selector: 'receiver',
  templateUrl: 'receiver.component.html',
  styleUrls: ['receiver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiverComponent
  extends OnDestroyMixin
  implements AfterViewInit, OnDestroy
{
  public files: NgxFileDropEntry[] = [];
  showGuide: boolean = false;

  @Select(AppSelectors.getChannelId) ChannelId$: Observable<string>;
  @Select(AppSelectors.getAccessKey) accessKey$: Observable<string>;
  @Select(ReceiverSelectors.localFiles) files$: Observable<IFilePartSending[]>;
  @Select(ReceiverSelectors.steps) steps$: Observable<any>;
  @Select(ReceiverSelectors.currentStep) currentStep$: Observable<any>;

  leechForm: FormGroup;
  @ViewChild('stepper') stepper: TuiStepperComponent;

  constructor(
    private store: Store,
    private commonService: SharedAppService,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.store.dispatch(new ReceiverResetStateToDefaultAction);
    this.store.dispatch(new AccessChannelAction(null, null));

    this.leechForm = new FormGroup({
      channelId: new FormControl(''),
      accessKey: new FormControl(''),
    });

    this.leechForm.valueChanges.pipe().subscribe((res) => {
      if (res.channelId && res.channelId.includes(' ')) {
        const val = res.channelId.split(' ');
        this.leechForm.setValue({ channelId: val[0], accessKey: val[1] });
      } else if (res.accessKey && res.accessKey.includes(' ')) {
        const val = res.accessKey.split(' ');
        this.leechForm.setValue({ channelId: val[0], accessKey: val[1] });
      }
      if (res.channelId && res.accessKey) {
        this.showGuide = true;
        this.cdr.detectChanges();
        this.store.dispatch(
          new AccessChannelAction(res.channelId, res.accessKey)
        );
      }
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new SetScreenAction('receiver'));

    const queryParams = this.activeRoute.snapshot.queryParams;
    if (Object.keys(queryParams).length > 0) {
      this.leechForm.patchValue(queryParams);
    }

    this.store
      .select(AppSelectors.isReadyToReceive)
      .pipe(
        untilComponentDestroyed(this),
        tap((res) => {
          if (res) {
            this.store.dispatch(new GetListFileAction());
          }
        }),
        debounceTime(1000)
      )
      .subscribe((res) => {
        if (res) {
          this.startLeech();
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CloseReceiverDataChannelAction());
    super.ngOnDestroy();
  }

  /**
   * Start getting file (leeching file)
   */
  startLeech() {
    const self = this;
    const channelId: string = this.leechForm.get('channelId').value;
    const accessKey: string = this.leechForm.get('accessKey').value;
    if (channelId.trim() === '' || accessKey.trim() === '') {
      this.commonService.showDialog('Please enter id and key!!').subscribe();
      self.stepper.activeItemIndex = -1;
    } else {
      this.leechForm.disable();
      this.showGuide = false;
      this.cdr.detectChanges();
      this.store.dispatch(new AccessChannelAction(channelId, accessKey));
      this.store
        .dispatch(new SetCurrentStepAction(1))
        .pipe(
          concatMap((val) => {
            return this.store.dispatch(new StartLeechingAction());
          })
        )
        .subscribe();
    }
  }

  click(item: HTMLElement) {
    item.nodeValue = null;
    item.click();
  }

  onClose(item) {}

  showDonate(content) {
    this.commonService.showDialogWithTemplate(content);
  }
}
