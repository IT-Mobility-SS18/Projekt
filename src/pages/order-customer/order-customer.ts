import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Slides, AlertController} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { Order } from '../../models/order/order.model'
import { BasketPage } from '../basket/basket';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase, { storage } from "firebase";
import { BasketService } from '../../providers/basket/basket-service';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'page-order-customer',
  templateUrl: 'order-customer.html',
})
export class OrderCustomerPage {
  BasketStateColor = this.BasketService.BasketStateColor;
 /*  order: Order = {
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
  } */
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
  ItemSelection = [];
  CurrentQuantity;
  EnteredQuantity;
  
  public images: any;
   @ViewChild('slider') slider: Slides;
   page = 0;
   constructor(public navCtrl: NavController, public FirebaseService: FirebaseService, private fire: AngularFireAuth, private alertCtrl: AlertController, private BasketService: BasketService) {
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

    addToArray(ItemId, ItemName, ItemPrice) {   
      this.ItemSelection = this.BasketService.ItemSelection;
        this.ItemSelection.push({
          ItemId: ItemId,
          Quantity: 1,
          Name: ItemName,
          Price: ItemPrice}
        );
      this.BasketService.ItemSelection = this.ItemSelection;
      this.BasketService.checkBasketContent();
    }
 
 presentPrompt(ItemId) {
    let alert = this.alertCtrl.create({
      title: 'Menge',
      inputs: [
        {
          name: 'Quantity',
          placeholder: '1'
        }
      ],
      buttons: [
        
        {
          text: 'Auswählen',
          handler: data => {
            //console.log('ausgelesene Menge: ' + data.Quantity);
            this.CurrentQuantity = data.Quantity
            this.BasketService.ItemSelection.push({Quantity: data.Quantity});
            //return  data.Quantity;
          }
        }
      ]
    });
    alert.present();
  }
  
  details() {
    const alert = this.alertCtrl.create({
      title: 'Text',
      subTitle: 'Text',
      buttons: ['OK']
    });
    alert.present();
  }
}
