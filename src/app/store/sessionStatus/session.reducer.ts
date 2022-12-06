import { createReducer, on } from '@ngrx/store';
import { deleteSessionStatusModel, setSessionStatusModel } from './session.actions';
import { initialSessionStoreState, SessionStoreState } from './session.state';

export const sessionReducer = createReducer<SessionStoreState>(
  initialSessionStoreState,
  on(
    setSessionStatusModel, 
    (currentState, action) => {
      return {
        ...currentState,
        sessionStatusModel: action.sessionStatus
      };
    }
  ),
  on(deleteSessionStatusModel, (currentState) => {
    return {
      ...currentState,
      sessionStatusModel: null,
    };
  })
);
