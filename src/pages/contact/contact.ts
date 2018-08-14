import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';   

// import services
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

  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  goToBasket() {
    this.navCtrl.push(BasketPage);
  }

}
