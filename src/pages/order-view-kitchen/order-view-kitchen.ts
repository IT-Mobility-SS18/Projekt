import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { BasketPage } from '../basket/basket';


@Component({
  selector: 'page-order-view-kitchen',
  templateUrl: 'order-view-kitchen.html'
})

export class OrderViewKitchenPage {

  ListCategory = [];
  viewarr= [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    this.firebaseService.getOrdersKitchen().then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log(this.viewarr);
    })
  }
  
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }
}
