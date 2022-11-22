import { NgModule } from '@angular/core';
import { FileNamePipe } from './file-name.pipe';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';


@NgModule({
  declarations: [FileNamePipe, YesNoDialogComponent],
  imports: [
  ],
  providers: [
    FileNamePipe
  ],
  exports:[FileNamePipe]
})
export class SharedAppModule {}
