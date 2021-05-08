import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AppUrl} from '../app.url';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {Success} from '../model/success-response';
import {JwtResponse} from '../model/jwt-response';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) {
  }

  login(user: User): Observable<Success<JwtResponse>> {
    return this.http.post<Success<JwtResponse>>(AppUrl.LOGIN, user)
      .pipe(
        catchError(this.handleError)
      )
      ;
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken != null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error);
  }
}
