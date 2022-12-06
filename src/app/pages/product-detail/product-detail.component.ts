import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!:Product;
  productId!:number;
  productDetailSubstances!:string[];
  quantity:number = 1;
  totalPrice!:number;


  constructor(
    private productsService:ProductsService,
    private route:ActivatedRoute, 
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(this.productId);
  }


  getProduct(id:number) {
    this.productsService.getProduct(id).subscribe((res) => {.
      if(res != null){
        this.product = res;
        this.totalPrice = res.price;
      }
     
      this.productDetailSubstances = this.product.description.split('.');
    
    });
  }

  onValueChange(quantity:number){
    this.totalPrice = (this.product.price * quantity);
  }

  addToCart(){
    const product:Product = {
      id:this.product.id,
      name:this.product.name,
      description:this.product.description,
      totalPrice:this.totalPrice,
      price:this.product.price,
      imageId:this.product.imageId,
      catagoryId:this.product.catagoryId,
      quantity:this.quantity
    }
    this.productsService.saveProductToStore(product);
    this.toastr.success("Ürün sepete eklendi...");
  }

}
