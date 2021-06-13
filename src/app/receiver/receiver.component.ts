import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, of, throwError } from 'rxjs';
import { IFileSending } from '../app.model';
import {
  AccessChanelAction,
  AppendFilesAction,
  SetCurrentStepAction,
  StartLeechingAction,
} from './receiver.action';
import { ReceiverState } from './receiver.state';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { v1 as uuidv1 } from 'uuid';
import { CommonService } from '../services/common.service';
import { TuiStepperComponent } from '@taiga-ui/kit';
import { ReceiverSelectors } from './receiver.selectors';
import { catchError, concatMap } from 'rxjs/operators';
import { ActivatedRoute, Route } from '@angular/router';
import { StateReset } from 'ngxs-reset-plugin';
import { PolymorpheusTemplate } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'receiver',
  templateUrl: 'receiver.component.html',
  styleUrls: ['receiver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiverComponent implements AfterViewInit {
  public files: NgxFileDropEntry[] = [];

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

  browseFile(files: FileList) {
    let fileSelect = this.fileMapping(files);
    if (fileSelect.length <= 3) {
      this.store.dispatch(new AppendFilesAction(fileSelect));
    } else {
      this.commonService.showDialog('Only support maximun 3 file');
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
