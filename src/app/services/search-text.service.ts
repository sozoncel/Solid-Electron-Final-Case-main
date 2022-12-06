import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTextService {

  constructor() { }

  private subject = new Subject<string>();//oluşturlan subject ile değişkene subscribaolup sürekli dinleme sağlanır...
  private subject2 = new Subject<string>();//oluşturlan subject ile değişkene subscribaolup sürekli dinleme sağlanır...

    sendDataSearch(message: string) {
        this.subject.next(message);//gelen değeri değişkene ata
    }

    sendData(message: string) {
      this.subject2.next(message);//gelen değeri değişkene ata
    }

    getDataSearch(): Observable<string> {
      return this.subject.asObservable();//değişkeni istenilen yere return et...
    }

    getData(): Observable<string> {
        return this.subject2.asObservable();//değişkeni istenilen yere return et...
    }
}
