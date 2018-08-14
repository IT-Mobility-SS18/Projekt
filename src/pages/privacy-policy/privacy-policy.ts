import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {
  BasketStateColor = this.BasketService.BasketStateColor;
  constructor(public navCtrl: NavController, public navParams: NavParams,private BasketService: BasketService) {
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPolicyPage');
  }

  // go to basket page
  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }
}
