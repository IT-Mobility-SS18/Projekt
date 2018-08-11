import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketPage } from '../basket/basket';
import { OrderCustomerPage } from '../order-customer/order-customer';
import { BasketService } from '../../providers/basket/basket-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  BasketStateColor:any;
  CurrentFirstName:string;

  constructor(public navCtrl: NavController,
      private BasketService: BasketService,
      public FirebaseService: FirebaseService,
      public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantPage');
  }

  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;

    this.CurrentFirstName = this.FirebaseService.CurrentUserFirstName;

  }


  goToBasket() {
    this.navCtrl.push(BasketPage);
  }

  goToOrderCustomer(){
    this.navCtrl.push(OrderCustomerPage);
  }


}
