import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  cartItems!:Product[];
  totalPrice!:number;

  constructor(
    private productService:ProductsService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.shopingCartModel$.subscribe((res) => {
      this.cartItems = res;
      this.totalPrice = 0;
      this.cartItems.forEach((item:any) => {
        this.totalPrice += item.totalPrice;
      });
    });
  }
  completeOrder(){
    if(this.cartItems.length > 0){
      this.router.navigateByUrl('/complete-order');
    }else{
      this.toastr.info("Siparişi tamamlamak için sepete bişeyler ekle...")
    }
  }

}
