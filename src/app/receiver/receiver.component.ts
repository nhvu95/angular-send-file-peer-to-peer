import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TuiStepperComponent } from '@taiga-ui/kit';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { concatMap, switchMap, takeUntil } from 'rxjs/operators';
import { v1 as uuidv1 } from 'uuid';
import { IFileSending } from '../app.model';
import { CommonService } from '../services/common.service';
import {
  AccessChanelAction,
  SetCurrentStepAction,
  StartLeechingAction,
} from './receiver.action';
import { ReceiverSelectors } from './receiver.selectors';
import { ReceiverState } from './receiver.state';

@Component({
  selector: 'receiver',
  templateUrl: 'receiver.component.html',
  styleUrls: ['receiver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiverComponent implements AfterViewInit {
  public files: NgxFileDropEntry[] = [];
  showGuide: boolean = false;

  @Select(ReceiverSelectors.chanelId) chanelId$: Observable<string>;
  @Select(ReceiverSelectors.accessKey) accessKey$: Observable<string>;
  @Select(ReceiverSelectors.localFiles) files$: Observable<IFileSending[]>;
  @Select(ReceiverSelectors.steps) steps$: Observable<any>;
  @Select(ReceiverSelectors.currentStep) currentStep$: Observable<any>;

  leechForm: FormGroup;
  @ViewChild('stepper') stepper: TuiStepperComponent;

  constructor(
    private store: Store,
    private commonService: CommonService,
    private activeRoute: ActivatedRoute
  ) {
    this.store.dispatch(new StateReset(ReceiverState));

    this.leechForm = new FormGroup({
      channelId: new FormControl(''),
      accessKey: new FormControl(''),
    });

    this.leechForm.valueChanges.pipe().subscribe((res) => {
      console.log(res);
      if (res.channelId && res.channelId.includes(' ')) {
        const val = res.channelId.split(' ');
        this.leechForm.setValue({ channelId: val[0], accessKey: val[1] });
      } else if (res.accessKey && res.accessKey.includes(' ')) {
        const val = res.accessKey.split(' ');
        this.leechForm.setValue({ channelId: val[0], accessKey: val[1] });
      }
      if (res.channelId && res.accessKey) {
        this.showGuide = true;
      }
    });

    const queryParams = this.activeRoute.snapshot.queryParams;
    if (Object.keys(queryParams).length > 0) {
      this.leechForm.patchValue(queryParams);
      if (Object.keys(queryParams).length == 2) this.startLeech();
    }
  }

  ngAfterViewInit(): void {}

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
      this.store.dispatch(new AccessChanelAction(channelId, accessKey));
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

  fileMapping(files: FileList | File[]) {
    let mapList: File[] = [];
    if (files instanceof FileList) mapList = Array.from(files);
    else mapList = files;
    const filesMap: IFileSending[] = mapList.map((file) => {
      return {
        fileId: uuidv1(),
        fileName: file.name,
        sendProcess: 0,
        status: 0,
        fileData: file,
      };
    });
    return filesMap;
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
