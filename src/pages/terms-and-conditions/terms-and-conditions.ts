import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketPage } from '../basket/basket';   
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html',
})
export class TermsAndConditionsPage {
  BasketStateColor = this.BasketService.BasketStateColor;
  constructor(public navCtrl: NavController, public navParams: NavParams,private BasketService: BasketService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsPage');
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }
  
}
