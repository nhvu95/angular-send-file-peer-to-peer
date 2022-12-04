import { Inject, Injectable, Injector } from '@angular/core';
import { YesNoDialogComponent } from '@shared/yes-no-dialog/yes-no-dialog.component';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiNotification,
  TuiNotificationsService,
} from '@taiga-ui/core';
import {
  PolymorpheusComponent,
  PolymorpheusTemplate,
} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedAppService {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    @Inject(Injector) private injector: Injector
  ) {}

  /**
   * Show dialog
   * @param message message
   * @param header dialog header
   * @param size dialog size
   */
  showDialog(
    message: string = 'If something goes wrong, it means I forgot to pay a bill. Sorry about that. LOL',
    header: string = 'Error',
    size: 's' | 'm' | 'l' = 's'
  ): Observable<any>  {
    return this.dialogService.open(message, {
      label: header,
      size,
      closeable: true,
      dismissible: true,
    });
  }

  /**
   * An elegant way to show a dialog
   * @param content Taiga context
   */
  showDialogWithTemplate(content: PolymorpheusTemplate<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  /**
   * Show notify
   * @param content notify content
   * @param heading notify header
   * @param autoClose does it auto close?
   */
  showNotify(content: string, heading: string, autoClose: number = -1): void {
    this.notificationsService
      .show(content.valueOf(), {
        label: heading.valueOf(),
        autoClose: autoClose < 0 ? false : autoClose,
        hasCloseButton: true,
      })
      .subscribe();
  }

  /**
   * Show notify ask user confirm
   * @param messageContent string content
   * @returns Observable<any>
   */
  showNotifyAskUserConfirm(messageContent: string): Observable<any> {
    return this.notificationsService.show<boolean, string>(
      new PolymorpheusComponent(YesNoDialogComponent, this.injector),
      {
        data: messageContent,
        label: 'Attention',
        status: TuiNotification.Warning,
        autoClose: false,
      }
    );
  }
}
