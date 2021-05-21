import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenreCount(): Observable<any>{
    return this.http.get<any>(AppUrl.GENRE_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getGenres(page?: string): Observable<any>{
    let httpParams = new HttpParams();
    if (page && page !== ''){
      httpParams = httpParams.set('page', page);
    }
    const options = {
      params : httpParams
    };
    return this.http.get(AppUrl.GENRE, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  addGenre(Genre: string): Observable<any>{
    const formData = new FormData();
    formData.append('name', Genre);
    return this.http.post(AppUrl.GENRE, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  editGenre(Genre: string, id: string): Observable<any>{
    const formData = new FormData();
    formData.append('name', Genre);
    return this.http.put(AppUrl.GENRE + '/' + id, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteGenre(id: string): Observable<any>{
    return this.http.delete(AppUrl.GENRE + '/' + id)
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
  }
}


