import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketPage } from '../basket/basket';

import { OrderViewCustomerPage } from '../order-view-customer/order-view-customer';

/**
 * Generated class for the PaymentConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-confirmation',
  templateUrl: 'payment-confirmation.html',
})
export class PaymentConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentConfirmationPage');
  }

  goToPayment() {
    this.navCtrl.push(OrderViewCustomerPage, {});
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

}
