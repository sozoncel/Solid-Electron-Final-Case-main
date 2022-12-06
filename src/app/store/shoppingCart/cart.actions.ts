import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';


export const setShoppingCartModel = createAction(
  '[Customer] Set Shopping Cart Model', 
  props<{ shopingCart: Product }>() 
 
);

export const deleteShoppingCartModel = createAction(
  '[Auth] Delete Shopping Cart Model'
);
