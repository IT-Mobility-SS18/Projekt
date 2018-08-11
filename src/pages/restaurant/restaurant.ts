import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketPage } from '../basket/basket';
import { OrderCustomerPage } from '../order-customer/order-customer';
import { BasketService } from '../../providers/basket/basket-service';


@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  BasketStateColor:any;

  constructor(public navCtrl: NavController,
      private BasketService: BasketService,
      public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantPage');
  }

  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }


  goToBasket() {
    this.navCtrl.push(BasketPage);
  }

  goToOrderCustomer(){
    this.navCtrl.push(OrderCustomerPage);
  }


}
