import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BasketPage } from '../basket/basket';

@Component({
  selector: 'page-imprint',
  templateUrl: 'imprint.html',
})
export class ImprintPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImprintPage');
  }

  goToBasket() {
    this.navCtrl.setRoot(BasketPage, {});
  }
}
