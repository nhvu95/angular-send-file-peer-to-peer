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

  showDialog(
    message: string = 'If something goes wrong, it means I forgot to pay a bill. Sorry about that. LOL',
    header: string = 'Error',
    size: 's' | 'm' | 'l' = 's'
  ) {
    return this.dialogService.open(message, {
      label: header,
      size: size,
      closeable: true,
      dismissible: true,
    });
  }

  showDialogWithTemplate(content: PolymorpheusTemplate<TuiDialogContext>) {
    this.dialogService.open(content).subscribe();
  }

  showNotify(content: String, heading: String, autoClose: number = -1) {
    this.notificationsService
      .show(content.valueOf(), {
        label: heading.valueOf(),
        autoClose: autoClose < 0 ? false : autoClose,
        hasCloseButton: true,
      })
      .subscribe();
  }

  showConfirm(messageContent: String) {
    return this.notificationsService.show<boolean, String>(
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
