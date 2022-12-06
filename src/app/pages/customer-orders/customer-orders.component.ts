import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  date:Date = new Date();
  orderNumber!:number;
  customerOrders!:any;
  totalPrice!:number;
  customerName?:string;
  userOrder!:any;

  constructor(
    private localStrogeService:LocalStorageService,
    private sessionStatusService:SessionStatusService
  ) { }

  ngOnInit(): void {
    this.orderNumber = Math.floor(10000000 + Math.random() * 90000000);
    this.getCustomerOrders();
  }

  getCustomerOrders() {
    this.sessionStatusService.sessionStatusModel$.subscribe((res) => {
      this.customerName = res?.userName;
    });
    let orders:any = this.localStrogeService.get('Orders');
    this.customerOrders = JSON.parse(orders);
    //console.log(this.customerOrders);
    if(this.customerOrders){
      this.userOrder = this.customerOrders.filter((item:{userName:string}) => item.userName === this.customerName);
    console.log("--",this.userOrder);

    this.totalPrice = 0;
    this.userOrder.map((item:any) => {
      item.productInformation.forEach((item:any) => {
        this.totalPrice += item.totalPrice;
      });
    })
    }
  }
}
