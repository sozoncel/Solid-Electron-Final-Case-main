import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTextService {

  constructor() { }

  private subject = new Subject<string>();
  private subject2 = new Subject<string>();

    sendDataSearch(message: string) {
        this.subject.next(message);
    }

    sendData(message: string) {
      this.subject2.next(message);
    }

    getDataSearch(): Observable<string> {
      return this.subject.asObservable();
    }

    getData(): Observable<string> {
        return this.subject2.asObservable();
    }
}
