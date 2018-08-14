import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';

// import services
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-imprint',
  templateUrl: 'imprint.html',
})
export class ImprintPage {
  BasketStateColor = this.BasketService.BasketStateColor;
  constructor(public navCtrl: NavController, public navParams: NavParams,private BasketService: BasketService) {
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad ImprintPage');
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
