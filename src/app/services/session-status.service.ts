import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { AppStoreState } from '../store/app.state';
import { deleteSessionStatusModel, setSessionStatusModel } from '../store/sessionStatus/session.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionStatusService {

  sessionStatusModel$:Observable<Session | null>;

  constructor(
    private store: Store<AppStoreState>
  ) {
    this.sessionStatusModel$ = this.store.select( //Store'dan sessionStatusModel'ı alıyoruz
      (state) => state.sessionStatus.sessionStatusModel
    );
   }

   saveSessionToStore(sessionStatus: Session) {
    this.store.dispatch(setSessionStatusModel( {sessionStatus}));
  }

  deleteSessionFromStore() {
    this.store.dispatch(deleteSessionStatusModel());
  }
}
