import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from '../services/common.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ...
    const token: string = localStorage.getItem('accessKey');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token),
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
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || error.status === 400) {
          this.commonService.showDialog(error.error.message).subscribe();
        }
        return of(null);
      })
    );
  }
}
