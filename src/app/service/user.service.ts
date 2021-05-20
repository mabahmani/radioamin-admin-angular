import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any>{
    return this.http.get<any>(AppUrl.PROFILE)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserCount(): Observable<any>{
    return this.http.get<any>(AppUrl.USER_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers(email?: string, active?: string, role?: string, sort?: string, direction?: string, page?: string, size?: string ):
    Observable<any>{

    let httpParams = new HttpParams();
    if (email && email !== ''){
      httpParams = httpParams.set('email', email);
    }

    if (active && active !== 'null'){
      httpParams = httpParams.set('active', String(active));
    }
    if (role && role !== 'null'){
      httpParams = httpParams.set('role', role);
    }
    if (direction && direction !== 'null'){
      httpParams = httpParams.set('direction', direction);
    }
    if (page && page !== 'null'){
      httpParams = httpParams.set('page', page);
    }
    if (size && size !== 'null'){
      httpParams = httpParams.set('size', size);
    }
    if (sort && sort !== 'null'){
      httpParams = httpParams.set('sort', sort);
    }
    const options = {
      params : httpParams
    };
    console.log(httpParams);
    return this.http.get<any>(AppUrl.USERS, options).pipe(
      catchError(this.handleError)
    );
  }

  changeUserActivation(active: boolean, userId: number): Observable<any>{
    return this.http.put(AppUrl.USERS_CHANGE_ACTIVATION + '/' + userId, null).pipe(
      catchError(this.handleError)
    );
  }

  setUserRoles(userId: number, roles: Array<any>): Observable<any>{
    return this.http.put(AppUrl.SET_ROLES + '/' + userId, roles).pipe(
      catchError(this.handleError)
    );
  }

  updateAvatar(file: any): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put(AppUrl.PROFILE_AVATAR, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(profile: any): Observable<any>{
    return this.http.put(AppUrl.PROFILE, profile).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any>{
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
