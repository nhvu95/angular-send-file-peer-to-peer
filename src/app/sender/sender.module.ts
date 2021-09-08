// Angular Imports
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TuiButtonModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import {
  TuiMarkerIconModule,
  TuiStepperComponent,
  TuiStepperModule
} from '@taiga-ui/kit';
import { ProgressBarModule } from "angular-progress-bar";
import { NgxFileDropModule } from 'ngx-file-drop';
// This Module's Components
import { SenderComponent } from './sender.component';
import { SenderState } from './sender.state';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SenderComponent,
      }
    ]),
    NgxsModule.forFeature([SenderState]),
    TuiRootModule,
    TuiMarkerIconModule,
    TuiButtonModule,
    TuiStepperModule,
    TuiDialogModule,
    NgxFileDropModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule
  ],
  providers: [AsyncPipe, TuiStepperComponent],
  declarations: [SenderComponent],
  exports: [],
})
export class SenderModule {}
