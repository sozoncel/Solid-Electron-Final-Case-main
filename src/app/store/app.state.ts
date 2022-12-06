import { SessionStoreState } from "./sessionStatus/session.state";
import { CartStoreState } from "./shoppingCart/cart.state";

export interface AppStoreState {
  cart: CartStoreState;
  sessionStatus: SessionStoreState;
}
