import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserStartPage } from '../user-start/user-start';
import { BasketPage } from '../basket/basket';   
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  BasketStateColor = this.BasketService.BasketStateColor;
  constructor(public navCtrl: NavController, public navParams: NavParams,private BasketService: BasketService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }
}
