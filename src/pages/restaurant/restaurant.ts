import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';
import { OrderCustomerPage } from '../order-customer/order-customer';

// import services
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

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantPage');
  }

  // values need to be present before rendering because otherwise they would not be shown
  ionViewCanEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
    this.CurrentFirstName = this.FirebaseService.CurrentUserFirstName;
  }

  // go to basket page
  goToBasket() {
    this.navCtrl.push(BasketPage);
  }

  // go to order overview
  goToOrderCustomer(){
    this.navCtrl.push(OrderCustomerPage);
  }

  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }
  
}
