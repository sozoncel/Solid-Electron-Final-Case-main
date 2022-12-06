import { createAction, props } from '@ngrx/store';
import { Session } from 'src/app/models/session';


export const setSessionStatusModel = createAction(
  '[Customer] Set Session Status Model', 
  props<{ sessionStatus: Session }>() 
 
);

export const deleteSessionStatusModel = createAction(
  '[Auth] Delete Session Status Model'
);
