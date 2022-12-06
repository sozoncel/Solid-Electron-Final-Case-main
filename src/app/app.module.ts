import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { StoreModule } from '@ngrx/store';
import { AppStoreState } from './store/app.state';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { CoompleteOrderComponent } from './pages/coomplete-order/coomplete-order.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    FilterProductPipe,
    ShopingCartComponent,
    CoompleteOrderComponent,
    CustomerOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {positionClass: 'toast-top-right'},
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot<AppStoreState>(appReducers),
    StoreDevtoolsModule.instrument({
      autoPause: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
