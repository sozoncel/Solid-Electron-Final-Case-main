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

  searchText:string = '';//ngmodel ile inputdan alınacak değeri bu deşikene atar...
  sessionStatus!:Session | null;
  cartItems!:Product[];
  totalPrice!:number;
  clickedCategory:string = 'all';

  constructor(
    private searchTextService:SearchTextService,//oluşturulan servis'e yakaladığı değeri göndericek...
    private sessionStatusService:SessionStatusService,
    private router:Router,
    private productService:ProductsService
    ) { }

  ngOnInit(): void {
    this.sessionStatusProcess();
    this.searchTextService.sendData(this.searchText);//observable aracılığıyla subscribers'lara text'i gönder
    this.onSearchTextChanged();//bu metot ile her değişiklik olduğunda yakalaya bilmek için html tarafında input eventi ile ilgili inputu yalayıp tekrar service içersindeki sendData metoduna gönderir...
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

  onSearchTextChanged() {//input değeri değiştiğinde bu metot çağrılır..
    this.searchTextService.sendDataSearch(this.searchText);//değişiklik servisteki sendData metoduna gönderilir...
  }
  showCategory(categoryName:string){
    this.searchTextService.sendData(categoryName);
    this.clickedCategory = categoryName;
  }

  login(){//navbarda bulunnan giriş yap butonu burayı teikler...
    this.router.navigateByUrl('/login');//login page yönlendir..
  }
  logout(){//navbarda bulunnan dropdown içersindeki çıkış yap butonu burayı teikler...
    this.sessionStatusService.deleteSessionFromStore();//store'da sessionı temizle
    this.router.navigateByUrl('/login');//login page yönlendir...
  }

}
