import { sessionReducer } from "./sessionStatus/session.reducer";
import { cartReducer } from "./shoppingCart/cart.reducer";

export const appReducers = {
  cart: cartReducer,
  sessionStatus: sessionReducer
};
