import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppUrl} from '../app.url';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbumCount(): Observable<any>{
    return this.http.get<any>(AppUrl.ALBUM_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAlbums(name?: string, sort?: string, direction?: string, page?: string, size?: string): Observable<any>{
    let httpParams = new HttpParams();
    if (name && name !== '') {
      httpParams = httpParams.set('name', name);
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
    return this.http.get<any>(AppUrl.ALBUM, options).pipe(
      catchError(this.handleError)
    );
  }

  createAlbum(albumName: any, singerId: any, releaseYear: any, coverFile: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', albumName);
    formData.append('cover', coverFile);
    formData.append('singerId', singerId);
    formData.append('releaseYear', releaseYear);
    return this.http.post<any>(AppUrl.ALBUM, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  editAlbum(albumName?: any, singerId?: any, releaseYear?: any, coverFile?: any, albumId?: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', albumName);
    formData.append('cover', coverFile);
    formData.append('singerId', singerId);
    formData.append('releaseYear', releaseYear);
    return this.http.put<any>(AppUrl.ALBUM + '/' + albumId, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAlbum(albumId?: any): Observable<any> {
    return this.http.delete<any>(AppUrl.ALBUM + '/' + albumId)
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
