import { createReducer, on } from '@ngrx/store';
import { deleteShoppingCartModel, setShoppingCartModel } from './cart.actions';
import { CartStoreState, initialCartStoreState } from './cart.state';

export const cartReducer = createReducer<CartStoreState>(
  initialCartStoreState,
  on(
    setShoppingCartModel, // yakalamak istediğim action
    (currentState, action) => {
      return {
        ...currentState,
        shoppingCartModel: [...currentState.shoppingCartModel ,action.shopingCart]
      };
    }
  ),
  on(deleteShoppingCartModel, (currentState) => {
    return {
      ...currentState,
      shoppingCartModel: [],
    };
  })
);
