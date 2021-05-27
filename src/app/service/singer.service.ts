import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) {
  }

  getSingerCount(): Observable<any> {
    return this.http.get<any>(AppUrl.SINGER_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSingers(singer?: string, sort?: string, direction?: string, page?: string, size?: string):
    Observable<any> {

    let httpParams = new HttpParams();
    if (singer && singer !== '') {
      httpParams = httpParams.set('singer', singer);
    }
    if (direction && direction !== 'null') {
      httpParams = httpParams.set('direction', direction);
    }
    if (page && page !== 'null') {
      httpParams = httpParams.set('page', page);
    }
    if (size && size !== 'null') {
      httpParams = httpParams.set('size', size);
    }
    if (sort && sort !== 'null') {
      httpParams = httpParams.set('sort', sort);
    }
    const options = {
      params: httpParams
    };
    console.log(httpParams);
    return this.http.get<any>(AppUrl.SINGER, options).pipe(
      catchError(this.handleError)
    );
  }

  getAllSingers(): Observable<any> {
    return this.http.get<any>(AppUrl.SINGER_ALL).pipe(
      catchError(this.handleError)
    );
  }

  createSinger(singerName: any, avatarFile: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', singerName);
    formData.append('avatar', avatarFile);
    return this.http.post<any>(AppUrl.SINGER, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSinger(singerName: any, avatarFile: any, id: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', singerName);
    formData.append('avatar', avatarFile);
    return this.http.put<any>(AppUrl.SINGER + '/' + id, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSinger(id: any): Observable<any> {
    return this.http.delete<any>(AppUrl.SINGER + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
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
