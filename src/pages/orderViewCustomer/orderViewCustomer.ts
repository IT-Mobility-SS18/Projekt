import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides} from 'ionic-angular';
import { BasketPage } from '../basket/basket';

@Component({
  selector: 'page-orderViewCustomer',
  templateUrl: 'orderViewCustomer.html'
})

export class OrderViewCustomerPage {
  public images: any;
     @ViewChild('slider') slider: Slides;
     page = 0;
     constructor(public navCtrl: NavController) {
     }

     goToBasket() {
      this.navCtrl.push(BasketPage, {});
    }

     selectedTab(index) {
       this.slider.slideTo(index);
     }

}
