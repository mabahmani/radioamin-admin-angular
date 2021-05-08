import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Alert} from '../model/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  constructor() { }

  onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  alert(msg: string, title: string): void {
    this.subject.next(new Alert(msg, title));
  }
}
