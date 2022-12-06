import { Product } from "src/app/models/product";


export interface CartStoreState {
  shoppingCartModel: Product[];
}

export const initialCartStoreState: CartStoreState = {
  shoppingCartModel: []
};
