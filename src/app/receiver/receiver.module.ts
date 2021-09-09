// Angular Imports
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiStepperComponent,
  TuiStepperModule,
} from '@taiga-ui/kit';
import { ProgressBarModule } from 'angular-progress-bar';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SignalingReceiver } from '../services/signaling-receiver.service';
import { FileNamePipe } from '../shared/file-name.pipe';
import { SharedAppModule } from '../shared/shared-app.module';
// This Module's Components
import { ReceiverComponent } from './receiver.component';
import { ReceiverState } from './receiver.state';

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
    SharedAppModule,
  ],
  providers: [AsyncPipe, TuiStepperComponent, SignalingReceiver, FileNamePipe],
  declarations: [ReceiverComponent],
  exports: [ReceiverComponent],
})
export class ReceiverModule {}
