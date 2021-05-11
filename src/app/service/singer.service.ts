import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Success} from '../model/success-response';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) { }

  getSingerCount(): Observable<Success<number>>{
    return this.http.get<Success<number>>(AppUrl.SINGER_COUNT)
      .pipe(
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
  }}
