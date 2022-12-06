import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { AppStoreState } from '../store/app.state';
import { deleteShoppingCartModel, setShoppingCartModel } from '../store/shoppingCart/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private controllerUrl = `${environment.apiUrl}/products`;

  shopingCartModel$:Observable<Product[]>;

  constructor(
    private httpClient:HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.shopingCartModel$ = this.store.select( //Store'dan shopingCartModel'ı alıyoruz
      (state) => state.cart.shoppingCartModel
    );
   }

  saveProductToStore(shopingCart: Product) {
    this.store.dispatch(setShoppingCartModel( {shopingCart}));
  }

  deleteProductToStore() {
    this.store.dispatch(deleteShoppingCartModel());
  }

  getProducts(){
    return this.httpClient.get<Product[]>(`${this.controllerUrl}`);
  }
  getProduct(productId:number){
    return this.httpClient.get<Product>(`${this.controllerUrl}/${productId}`);//gelen id'ye göre ürünü get et...
  }
}
