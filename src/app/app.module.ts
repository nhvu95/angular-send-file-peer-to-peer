import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { SenderState } from './sender/sender.state';
import { environment } from 'src/environments/environment';
import { AsyncPipe } from '@angular/common';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiDialogService,
  TuiRootModule,
} from '@taiga-ui/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReceiverState } from './receiver/receiver.state';
import { RTCRxStompConfig } from './services/rx-stomp.config';
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
} from '@stomp/ng2-stompjs';
import { AppState } from './app.state';
import { SignalingSender } from './services/signaling-sender.service';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { HttpConfigInterceptor } from './interceptor/http.interceptor';
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDialogModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    HttpClientModule,
  ],
  providers: [
    AsyncPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: InjectableRxStompConfig,
      useValue: RTCRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
    CommonService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
