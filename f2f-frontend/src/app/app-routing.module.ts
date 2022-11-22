import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./sender/sender.module').then((m) => m.SenderModule),
  },
  {
    path: 'receiver',
    loadChildren: () =>
      import('./receiver/receiver.module').then((m) => m.ReceiverModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
