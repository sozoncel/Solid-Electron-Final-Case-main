import { createAction, props } from '@ngrx/store';
import { Session } from 'src/app/models/session';


export const setSessionStatusModel = createAction(
  '[Customer] Set Session Status Model', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ sessionStatus: Session }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const deleteSessionStatusModel = createAction(
  '[Auth] Delete Session Status Model'
);
