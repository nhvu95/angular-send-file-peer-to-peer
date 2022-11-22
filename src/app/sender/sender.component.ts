import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AccessChannelAction, SetScreenAction } from '@shared/app.action';
import { IFilePartSending } from '@shared/app.model';
import { AppSelectors } from '@shared/app.selector';
import { SharedAppService } from '@shared/shared-app.service';
import { TuiStepperComponent } from '@taiga-ui/kit';
import {
  OnDestroyMixin
} from '@w11k/ngx-componentdestroyed';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { Observable } from 'rxjs';
import {
  AppendFilesAction,
  CloseSenderDataChannelAction,
  DeleteFilesAction,
  InitializeChannelAction,
  SendDataAction,
  SenderResetStateToDefaultAction
} from './sender.action';
import { SenderSelectors } from './sender.selector';

@Component({
  selector: 'sender',
  templateUrl: 'sender.component.html',
  styleUrls: ['sender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent
  extends OnDestroyMixin
  implements AfterViewInit, OnDestroy
{
  public files: NgxFileDropEntry[] = [];
  showGuide: boolean = false;
  browseDisable: boolean = false;
  @Select(AppSelectors.getChannelId) channelId$: Observable<string>;
  @Select(AppSelectors.getAccessKey) accessKey$: Observable<string>;
  @Select(SenderSelectors.getLocalFiles) files$: Observable<IFilePartSending[]>;
  @Select(SenderSelectors.getAllStep) steps$: Observable<any>;
  @Select(SenderSelectors.getCurrentStep) currentStep$: Observable<any>;

  @ViewChild('stepper') stepper: TuiStepperComponent;

  constructor(
    private router: Router,
    private store: Store,
    private commonService: SharedAppService
  ) {
    super();
    this.store.dispatch(new SenderResetStateToDefaultAction);
    this.store.dispatch(new AccessChannelAction(null, null));
    
    this.listenEvent();
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new SetScreenAction('sender'));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CloseSenderDataChannelAction());
    super.ngOnDestroy();
  }

  /**
   * When data channel is ready, send the file
   */
  listenEvent() {
    this.store
      .select(SenderSelectors.getDataChannelState)
      // .pipe(untilComponentDestroyed(this))
      .subscribe((state) => {
        if (state == 'open') {
          this.store.dispatch(new SendDataAction());
        }
      });

    this.store
      .select(SenderSelectors.isAllReceiverDone)
      // .pipe(untilComponentDestroyed(this))
      .subscribe((done) => {
        if (done) {
          this.commonService
            .showConfirm(
              'Your friends were downloading completely! You can close the tab now!'
            )
            .subscribe((res) => {
              this.router.navigateByUrl('/').then((res) => {
                window.location.reload();
              });
            });
        }
      });
  }

  /**
   * Start the game
   * @trigger when user click on step 1
   * @returns
   */
  initChannel() {
    const files = this.store.selectSnapshot<IFilePartSending[]>(
      SenderSelectors.getLocalFiles
    );
    if (files && files.length > 0) {
      this.showGuide = false;
      this.browseDisable = true;
      this.commonService.showNotify(
        "Wait until step2 complete then share 'link' or 'id | key'  to your friends ",
        'Initialize Channel',
        3000
      );
      return this.store.dispatch(new InitializeChannelAction());
    } else {
      this.stepper.activeItemIndex = -1;
      return this.commonService
        .showDialog('Please select atleast 1 file..')
        .subscribe();
    }
  }

  /**
   * Mapping from browser file to system file
   * @param files
   * @returns
   */
  fileMapping(files: FileList | File[]) {
    let mapList: File[] = [];
    if (files instanceof FileList) mapList = Array.from(files);
    else mapList = files;
    const filesMap: IFilePartSending[] = mapList.map((file, index) => {
      return {
        fileId: index,
        fileName: file.name,
        currentSize: 0,
        status: 0,
        fileData: file,
        totalPart: 1,
        fileSize: file.size,
        index: 0,
      };
    });
    return filesMap;
  }

  click(item: HTMLElement) {
    item.nodeValue = null;
    item.click();
  }
  onClose(index) {
    this.store.dispatch(new DeleteFilesAction(index));
  }

  //dragDropFilePart
  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    if (files.length > 0) {
      this.showGuide = true;
    }
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          this.store.dispatch(new AppendFilesAction(this.fileMapping([file])));
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
