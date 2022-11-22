import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSelectors } from '@shared/app.selector';
import { SharedAppService } from '@shared/shared-app.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private commonService: SharedAppService, private store: Store) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ...
    let accessKey = this.store.selectSnapshot(AppSelectors.getAccessKey);
    let peerId = this.store.selectSnapshot(AppSelectors.getPeerId);

    if (accessKey) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Basic ${btoa(peerId + ':' + accessKey)}`
        ),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || error.status === 400) {
          this.commonService.showDialog(error.error?.message).subscribe();
        }
        return of(null);
      })
    );
  }
}
