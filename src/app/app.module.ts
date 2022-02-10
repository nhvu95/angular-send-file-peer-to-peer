import { AsyncPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory
} from '@stomp/ng2-stompjs';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TuiRootModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState } from './app.state';
import { HttpConfigInterceptor } from './interceptor/http.interceptor';
import { CommonService } from './services/common.service';
import { RTCRxStompConfig } from './services/rx-stomp.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    // TuiAvatarModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiNotificationsModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    HttpClientModule,
    TuiTabsModule,
    TuiSvgModule
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
    CommonService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
