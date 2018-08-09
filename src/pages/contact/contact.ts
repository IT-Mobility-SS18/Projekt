import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserStartPage } from '../user-start/user-start';

import { BasketPage } from '../basket/basket';   

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  goToBasket() {
    this.navCtrl.setRoot(BasketPage, {});
  }
}
