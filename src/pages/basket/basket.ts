import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  goToPayment() {
    this.navCtrl.push(PaymentPage, {});
  }
  cancelBasket(){
    this.navCtrl.pop();
  }
}
