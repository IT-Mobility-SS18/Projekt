import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Slides, AlertController} from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { Order } from '../../models/order/order.model'
import { BasketPage } from '../basket/basket';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase, { storage } from "firebase";


@Component({
  selector: 'page-order-view-service',
  templateUrl: 'order-view-service.html'
})

export class OrderViewServicePage {
  @ViewChild('slider') slider: Slides;
  selectedSegment: string;
  slides: any;
   page = 0;

  ListCategory = [];
  viewarr= [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    this.firebaseService.getAllOrders().then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log(this.viewarr);
    })
  }

  selectedTab(index) {
       this.slider.slideTo(index);
     }

  goToBasket(){
    this.navCtrl.push(BasketPage);
  }
}
