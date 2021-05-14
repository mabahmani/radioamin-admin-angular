import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Success} from '../model/success-response';
import {Profile} from '../model/profile';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';
import {UserRequest} from '../model/user-request';
import {Pageable} from '../model/pageable-response';
import {UserResponse} from '../model/user-response';
import {RoleEnum} from '../model/role-enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Success<Profile>>{
    return this.http.get<Success<Profile>>(AppUrl.PROFILE)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserCount(): Observable<Success<number>>{
    return this.http.get<Success<number>>(AppUrl.USER_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers(email?: string, role?: RoleEnum, sort?: string, direction?: string, page?: number, size?: number ):
    Observable<any>{

    const httpParams = new HttpParams();
    if (email){
      httpParams.append('email', email);
    }
    if (role){
      httpParams.append('role', role.toString());
    }
    if (direction){
      httpParams.append('direction', direction);
    }
    if (page){
      httpParams.append('page', String(page));
    }
    if (size){
      httpParams.append('size', String(size));
    }
    const options = {
      params : httpParams
    };

    return this.http.get<Success<UserRequest>>(AppUrl.USERS, options).pipe(
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
