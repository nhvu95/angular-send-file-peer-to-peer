// Angular Imports
import { AsyncPipe, CommonModule } from '@angular/common';
import { APP_INITIALIZER, ChangeDetectorRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {
  TuiInputModule,
  TuiStepperComponent,
  TuiStepperModule,
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';

// This Module's Components
import { ReceiverComponent } from './receiver.component';
import { ReceiverState } from './receiver.state';
import { NgxFileDropModule } from 'ngx-file-drop';

import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { SignalingReceiver } from '../services/signaling-receiver.service';
import { ProgressBarModule } from 'angular-progress-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReceiverComponent,
      },
    ]),
    NgxsModule.forFeature([ReceiverState]),
    TuiButtonModule,
    TuiStepperModule,
    NgxFileDropModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    ProgressBarModule,
    TuiTextfieldControllerModule,
  ],
  providers: [AsyncPipe, TuiStepperComponent, SignalingReceiver],
  declarations: [ReceiverComponent],
  exports: [ReceiverComponent],
})
export class ReceiverModule {}
