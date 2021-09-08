import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TuiStepperComponent } from '@taiga-ui/kit';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { v1 as uuidv1 } from 'uuid';
import { IFileSending } from '../app.model';
import { CommonService } from '../services/common.service';
import { AppendFilesAction, InitChanelAction } from './sender.action';
import { SenderSelectors } from './sender.selectors';
import { SenderState } from './sender.state';
import { Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { SignalingSender } from '../services/signaling-sender.service';

@Component({
  selector: 'sender',
  templateUrl: 'sender.component.html',
  styleUrls: ['sender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent implements AfterViewInit {
  public files: NgxFileDropEntry[] = [];
  showGuide: boolean = false;
  @Select(SenderSelectors.channelId) channelId$: Observable<string>;
  @Select(SenderSelectors.accessKey) accessKey$: Observable<string>;
  @Select(SenderSelectors.localFiles) files$: Observable<IFileSending[]>;
  @Select(SenderSelectors.steps) steps$: Observable<any>;
  @Select(SenderSelectors.currentStep) currentStep$: Observable<any>;

  @ViewChild('stepper') stepper: TuiStepperComponent;

  constructor(
    private store: Store,
    private commonService: CommonService,
    private signalingSender: SignalingSender
  ) {
    console.log('SenderComponent init');
    this.store.dispatch(new StateReset(SenderState));
  }

  ngAfterViewInit(): void {
    this.signalingSender.initCoordinatorChanel(null);
  }

  initChanel() {
    const files = this.store.selectSnapshot<IFileSending[]>(
      SenderSelectors.localFiles
    );
    if (files && files.length > 0) {
      this.showGuide = false;
      return this.store.dispatch(new InitChanelAction());
    } else {
      this.stepper.activeItemIndex = -1;
      return this.commonService
        .showDialog('Please select atleast 1 file..')
        .subscribe();
    }
  }

  fileMapping(files: FileList | File[]) {
    let mapList: File[] = [];
    if (files instanceof FileList) mapList = Array.from(files);
    else mapList = files;
    const filesMap: IFileSending[] = mapList.map((file) => {
      return {
        fileId: 'f' + uuidv1().replace(/\-/g, '_'),
        fileName: file.name,
        currentSize: 0,
        status: 0,
        fileData: file,
        totalPart: 1,
        fileSize: file.size,
      };
    });
    return filesMap;
  }

  click(item: HTMLElement) {
    item.nodeValue = null;
    item.click();
  }
  onClose(item) {}

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
          console.log(droppedFile.relativePath, file);
          this.store.dispatch(new AppendFilesAction(this.fileMapping([file])));
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
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
