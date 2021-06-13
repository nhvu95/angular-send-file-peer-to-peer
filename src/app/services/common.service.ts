import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusTemplate } from '@tinkoff/ng-polymorpheus';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService) {
  }

  showDialog(
    message: string,
    header: string = 'Error',
    size: 's' | 'm' | 'l' = 's'
  ) {
    return this.dialogService.open(message, {
      label: header,
      size: size,
    });
  }

  showDialogWithTemplate(content: PolymorpheusTemplate<TuiDialogContext>) {
    this.dialogService.open(content).subscribe();
  }
}
