import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-imprint',
  templateUrl: 'imprint.html',
})
export class ImprintPage {
  BasketStateColor = this.BasketService.BasketStateColor;
  constructor(public navCtrl: NavController, public navParams: NavParams,private BasketService: BasketService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImprintPage');
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }
  
  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }
}
