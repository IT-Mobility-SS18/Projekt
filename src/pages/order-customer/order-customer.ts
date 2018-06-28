import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Slides} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { Order } from '../../models/order/order.model'
import { BasketPage } from '../basket/basket';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase, { storage } from "firebase";


@IonicPage()
@Component({
  selector: 'page-order-customer',
  templateUrl: 'order-customer.html',
})
export class OrderCustomerPage {
  order: Order = {
    UserId: undefined,
    Name: undefined,
    Price: undefined,
    Quantity: undefined,
    Picture: 'none',
    DeliveryCosts: 0.0,
    OrderState: 'open',
    TimeStamp: 'timestampvalue',
    RestaurantId: 45,
    PayStatus: 'not paid',
    Annotations: undefined,
    TableId: 12
  }
  CurrentRestaurantId = 45;
  ListCategory = [];
  viewarr= [];
  ItemId = '65246b5b456bvgbrgber';
  UserId;
  PicStorage = firebase.storage();
  PicReference = this.PicStorage.ref();
  ImagesRef = this.PicReference.child('ItemPics');
  IMGRef = this.ImagesRef.child('image.jpg').getDownloadURL();
  test;
  
  public images: any;
   @ViewChild('slider') slider: Slides;
   page = 0;
   constructor(public navCtrl: NavController, public FirebaseService: FirebaseService, private fire: AngularFireAuth) {
    this.UserId = this.fire.auth.currentUser.uid;
    FirebaseService.getRestaurantItems(this.CurrentRestaurantId).then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
    })
    //IMG testing
    this.test= this.IMGRef.then(function(url) {
     return url;
    })
    console.log('IMG Path is: ' + this.test);
   }

   goToBasket() {
     this.navCtrl.push(BasketPage, {});
   }

   selectedTab(index) {
     this.slider.slideTo(index);
   }
   addCustomerOrder(order: Order) {
    this.FirebaseService.addCustomerOrder(order);
  }
}
