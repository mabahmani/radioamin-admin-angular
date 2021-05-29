import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppUrl} from '../app.url';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getMusicCount(): Observable<any>{
    return this.http.get<any>(AppUrl.MUSIC_COUNT)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMusics(name?: string, sort?: string, direction?: string, page?: string, size?: string): Observable<any>{
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
    return this.http.get<any>(AppUrl.MUSIC, options).pipe(
      catchError(this.handleError)
    );
  }

  draftMusic(musicName: any, type: any, singerId: any, albumId: any, languageId: any, coverFile: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', musicName);
    formData.append('type', type);
    formData.append('singerId', singerId);
    formData.append('albumId', albumId);
    formData.append('languageId', languageId);
    formData.append('cover', coverFile);
    return this.http.post<any>(AppUrl.MUSIC, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadMusic(musicId: string, musicType: string, musicFile: any): Observable<any> {
    const formData = new FormData();
    formData.append('musicUrlType', musicType);
    formData.append('music', musicFile);
    const req = new HttpRequest('POST', AppUrl.MUSIC_UPLOAD + '/' + musicId, formData, {
      reportProgress: true
    });

    return this.http.request(req)
      .pipe(
        map(event => this.getEventMessage(event, musicFile)),
        tap(progress => this.showProgress(progress)),
        catchError(this.handleError)
      );
  }

  addMusicGenres(genres: any, musicId: any): Observable<any> {
    return this.http.put(AppUrl.MUSIC_GENRE + '/' + musicId, genres)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMusicFile(musicId: any, musicType: any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('musicUrlType', musicType);
    const options = {
      params: httpParams
    };
    return this.http.delete<any>(AppUrl.MUSIC_DELETE_FILE + '/' + musicId, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMusic(musicId: any): Observable<any> {
    return this.http.delete<any>(AppUrl.MUSIC + '/' + musicId)
      .pipe(
        catchError(this.handleError)
      );
  }

  publishMusic(musicId: any): Observable<any> {
    return this.http.put(AppUrl.MUSIC_PUBLISH + '/' + musicId, null)
      .pipe(
        catchError(this.handleError)
      );
  }

  addLyric(lyric: any, musicId: any): Observable<any> {
    const formData = new FormData();
    formData.append('lyric', lyric);
    return this.http.put(AppUrl.MUSIC_LYRIC + '/' + musicId, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private getEventMessage(event: HttpEvent<any>, file: File): any {
    switch (event.type) {
      case HttpEventType.Sent:
        return '0';
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / (event.total ?? 0));
        return String(percentDone);
      case HttpEventType.Response:
        return event;
      default:
        return undefined;
    }
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

  private showProgress(progress: string): string {
    return progress;
  }
}
