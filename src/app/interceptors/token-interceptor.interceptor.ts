import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, finalize, retry, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public authService: AuthService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshingToken) {
      // If refreshTokenInProgress is true, we will wait until tokenSubject has a non-null value
      // which means the new token is ready and we can retry the request again
      return this.tokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next.handle(this.addToken(req, this.authService.getToken())))
      );
    } else {
      this.isRefreshingToken = true;
      // Set the tokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.tokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: string) => {
          this.tokenSubject.next(true);
          this.authService.setToken(token);
          return next.handle(this.addToken(req, token));
        }),
        // When the call to refreshToken completes we reset the isRefreshingToken to false
        // for the next time the token needs to be refreshed
        finalize(() => this.isRefreshingToken = false)
      );
    }
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getToken())).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) { 
          return this.handle401Error(req, next);
        }
      })
    );
  }

}
