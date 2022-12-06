import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';


export const setShoppingCartModel = createAction(
  '[Customer] Set Shopping Cart Model', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ shopingCart: Product }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const deleteShoppingCartModel = createAction(
  '[Auth] Delete Shopping Cart Model'
);
