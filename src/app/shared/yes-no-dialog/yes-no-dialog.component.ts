import { Component, Inject, OnInit } from '@angular/core';
import { TuiNotificationContentContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'et-yes-no-dialog',
  template: `
    <div
      style="
      display:flex; 
      flex-direction: column;
      column-count: 1;
      width: 100%;
      align-items: center;"
    >
      <div class="width: 100%;">{{ message }}</div>
      <div
        (click)="ok()"
        class="button-ok"
      >
        Ok
      </div>
    </div>
  `,
  styles: [],
})
export class YesNoDialogComponent {
  message: String = '';
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiNotificationContentContext<boolean>
  ) {
    this.message = context.data;
  }

  ok() {
    this.context.emitAndCloseHook(true);
  }

  cancel() {
    this.context.emitAndCloseHook(false);
  }
}
