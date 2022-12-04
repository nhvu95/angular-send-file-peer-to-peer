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
  InitializeSignalingChannelAction,
  SendDataAction,
  SenderResetStateToDefaultAction
} from './sender.action';
import { SenderSelectors } from './sender.selector';

@Component({
  selector: 'et-sender',
  templateUrl: 'sender.component.html',
  styleUrls: ['sender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent
  extends OnDestroyMixin
  implements AfterViewInit, OnDestroy
{
  public files: NgxFileDropEntry[] = [];
  showGuide = false;
  browseDisable = false;
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
    this.store.dispatch(new SenderResetStateToDefaultAction());
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
  listenEvent(): void {
    this.store
      .select(SenderSelectors.getDataChannelState)
      // .pipe(untilComponentDestroyed(this))
      .subscribe((state) => {
        if (state === 'open') {
          this.store.dispatch(new SendDataAction());
        }
      });

    this.store
      .select(SenderSelectors.isAllReceiverDone)
      // .pipe(untilComponentDestroyed(this))
      .subscribe((done) => {
        if (done) {
          this.commonService
            .showNotifyAskUserConfirm(
              'Your friends were downloading completely! You can close the tab now!'
            )
            .subscribe((res) => {
              this.router.navigateByUrl('/').then((_) => {
                window.location.reload();
              });
            });
        }
      });
  }

  /**
   * Start the game
   * @trigger when user click on step 1
   */
  initChannel(): void {
    const files = this.store.selectSnapshot<IFilePartSending[]>(
      SenderSelectors.getLocalFiles
    );
    if (files && files.length > 0) {
      this.showGuide = false;
      this.browseDisable = true;
      this.commonService.showNotify(
        'Wait until step2 complete then share \'link\' or \'id | key\'  to your friends ',
        'Initialize Channel',
        3000
      );
      this.store.dispatch(new InitializeSignalingChannelAction());
    } else {
      this.stepper.activeItemIndex = -1;
      this.commonService
        .showDialog('Please select atleast 1 file..')
        .subscribe();
    }
  }

  /**
   * Mapping from browser file to system file
   * @param files list of input file
   * @returns list of file
   */
  fileMapping(files: FileList | File[]): IFilePartSending[] {
    let mapList: File[] = [];
    if (files instanceof FileList) { mapList = Array.from(files); }
    else { mapList = files; }
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

  /**
   * On press button close in list of file
   * @param index: number
   */
  onClose(index: number): void {
    this.store.dispatch(new DeleteFilesAction(index));
  }

  /**
   * ON drag and drop a file on the list
   * @param files : files change
   */
  dropped(files: NgxFileDropEntry[]): void {
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

  /**
   * Debug event
   * @param event from DOM
   */
  public fileOver(event): void {
    console.log(event);
  }

  /**
   * Debug event
   * @param event from DOM
   */
  public fileLeave(event): void{
    console.log(event);
  }
}
