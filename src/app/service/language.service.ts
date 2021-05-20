import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getLanguageCount(): Observable<any>{
    return this.http.get<any>(AppUrl.LANGUAGE_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLanguages(page?: string): Observable<any>{
    let httpParams = new HttpParams();
    if (page && page !== ''){
      httpParams = httpParams.set('page', page);
    }
    const options = {
      params : httpParams
    };
    return this.http.get(AppUrl.LANGUAGE, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  addLanguage(language: string): Observable<any>{
    const formData = new FormData();
    formData.append('name', language);
    return this.http.post(AppUrl.LANGUAGE, formData)
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
