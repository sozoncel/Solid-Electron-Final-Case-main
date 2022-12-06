import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Session } from 'src/app/models/session';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductsService } from 'src/app/services/products.service';
import { SearchTextService } from 'src/app/services/search-text.service';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText:string = '';
  sessionStatus!:Session | null;
  cartItems!:Product[];
  totalPrice!:number;
  clickedCategory:string = 'all';

  constructor(
    private searchTextService:SearchTextService,
    private sessionStatusService:SessionStatusService,
    private router:Router,
    private productService:ProductsService
    ) { }

  ngOnInit(): void {
    this.sessionStatusProcess();
    this.searchTextService.sendData(this.searchText);
    this.onSearchTextChanged();
    this.productService.shopingCartModel$.subscribe((res) => {
      this.cartItems = res;
      this.totalPrice = 0;
      this.cartItems.forEach((item) => {
        this.totalPrice += item.price;
      })
    });
  }

  sessionStatusProcess() {
    this.sessionStatusService.sessionStatusModel$.subscribe((res) => {
      this.sessionStatus = res;
    })
  }

  onSearchTextChanged() {
    this.searchTextService.sendDataSearch(this.searchText);
  }
  showCategory(categoryName:string){
    this.searchTextService.sendData(categoryName);
    this.clickedCategory = categoryName;
  }

  login(){
    this.router.navigateByUrl('/login');
  }
  logout(){
    this.sessionStatusService.deleteSessionFromStore();
    this.router.navigateByUrl('/login');
  }

}
