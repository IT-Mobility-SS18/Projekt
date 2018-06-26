import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Slides} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { Order } from '../../models/order/order.model'

@IonicPage()
@Component({
  selector: 'page-order-customer',
  templateUrl: 'order-customer.html',
})
export class OrderCustomerPage {
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
