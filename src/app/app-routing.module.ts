import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { CoompleteOrderComponent } from './pages/coomplete-order/coomplete-order.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo : 'home'
  },
  {
    path: "home",
    component : HomeComponent,
    canActivate:[LoginGuard]
  },
  {
    path: "login",
    component : LoginComponent
  },
  {
    path: "register",
    component : RegisterComponent
  },
  {
    path: "product-detail/:id",
    component:ProductDetailComponent,
    canActivate:[LoginGuard]
  },
  {
    path: "cart",
    component:ShopingCartComponent,
    canActivate:[LoginGuard]
  },
  {
    path: "complete-order",
    component:CoompleteOrderComponent,
    canActivate:[LoginGuard]
  },
  {
    path: "customer-orders",
    component:CustomerOrdersComponent,
    canActivate:[LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
