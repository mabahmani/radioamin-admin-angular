import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AppUrl} from '../app.url';
import {Observable, throwError} from 'rxjs';
import {UserRequest} from '../model/user-request';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) {
  }

  login(user: UserRequest): Observable<any> {
    return this.http.post<any>(AppUrl.LOGIN, user)
      .pipe(
        catchError(this.handleError)
      )
      ;
  }

  newToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getRefreshToken()
      })
    };
    return this.http.post<any>(AppUrl.NEW_TOKEN, null, httpOptions)
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

  logout(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getRefreshToken()
      })
    };

    return this.http.post<any>(AppUrl.LOGOUT, null, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  clearLocalStorage(): void{
    localStorage.clear();
  }

  private handleError(error: any): Observable<any> {
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
