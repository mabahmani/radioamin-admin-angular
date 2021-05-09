import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, throwError} from 'rxjs';

import {AuthService} from './service/auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Success} from './model/success-response';
import {JwtResponse} from './model/jwt-response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('logout') || req.url.includes('new-token')) {
      return next.handle(req);
    }

    if (this.authService.isAuthenticated()) {
      req = this.addToken(req, this.authService.getAccessToken());
    }

    // @ts-ignore
    return next.handle(req).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this.handle401Error(req, next);
      } else {
        return throwError(err);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, accessToken: string | null): any {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }


  private handle401Error(req: HttpRequest<any>, next: HttpHandler): any {
    if (req.url.includes('new-token')) {
      return this.authService.logout().subscribe(
        data => {
          this.authService.clearLocalStorage();
        });
    }
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.newToken().pipe(
        switchMap((response: Success<JwtResponse>) => {
          this.isRefreshing = false;
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          this.refreshTokenSubject.next(response.data.accessToken);
          return next.handle(this.addToken(req, response.data.accessToken));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((accessToken: string) => {
          return next.handle(this.addToken(req, accessToken));
        }));
    }
  }
}

