import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'receiver',
    loadChildren: () =>
      import('./receiver/receiver.module').then((m) => m.ReceiverModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./sender/sender.module').then((m) => m.SenderModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
