import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiNotification,
  TuiNotificationsService,
} from '@taiga-ui/core';
import { PolymorpheusTemplate } from '@tinkoff/ng-polymorpheus';
import { switchMap, takeUntil } from 'rxjs/operators';
import { YesNoDialogComponent } from '../shared/yes-no-dialog/yes-no-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    @Inject(Injector) private injector: Injector,
    private router: Router
  ) {}

  showDialog(
    message: string,
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

  showNotify(content: String, heading: String) {
    this.notificationsService
      .show(content.valueOf(), {
        label: heading.valueOf(),
        autoClose: false,
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
        autoClose: false
      }
    );
  }
}
