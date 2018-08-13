import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { BasketPage } from '../basket/basket';

//import { IonicPage, AlertController } from 'ionic-angular';
//import { Order } from '../../models/order/order.model'
//import { AngularFireAuth } from 'angularfire2/auth';
//import firebase, { storage } from "firebase";

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
  openOrdersArr = [];
  preparingArr = [];
  readyArr = [];
  doneArr = [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
  }

  getallOrdersFromFirebase() {
    return new Promise((resolve, reject) => {
    this.firebaseService.getAllOrders().then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log(this.viewarr);
      resolve(this.viewarr);
      reject();
    })
  })
  }

  ionViewWillEnter() {
    this.getallOrdersFromFirebase().then(() => this.filterItems());

   }

   async manipulateTimeStamp(){
     var tmpstr:string;
     for (var iterH in this.viewarr) {
       tmpstr = this.viewarr[iterH].TimeStamp;
       tmpstr = tmpstr.substring(tmpstr.length-5, tmpstr.length);
       this.viewarr[iterH].TimeStamp=tmpstr;
     }
   }

   async filterItems() {

   await this.manipulateTimeStamp();

   //alle offenen
   for (var iterG in this.viewarr) {
     if (this.viewarr[iterG].OrderState == "open" ) {
       this.openOrdersArr.push(this.viewarr[iterG]);
     }
   }
   console.log("openOrdersArr", this.openOrdersArr);
   //alle in Zubereitung
   for (var iterH in this.viewarr) {
     if (this.viewarr[iterH].OrderState == "preparing" ) {
       this.preparingArr.push(this.viewarr[iterH]);
     }

   }
   console.log("preparingArr", this.preparingArr);
   //alle zur Abholung durch Service fertigen
   for (var iterN in this.viewarr) {
     if (this.viewarr[iterN].OrderState == "ready" ) {
       this.readyArr.push(this.viewarr[iterN]);
     }

   }
   console.log("readyArr", this.readyArr);
//alle abgeschlossenen Bestellungen
   for (var iterD in this.viewarr) {
    if (this.viewarr[iterD].OrderState == "done" ) {
      this.doneArr.push(this.viewarr[iterD]);
    }

  }
  console.log("doneArr", this.doneArr);
 }

  // not in use at the moment
  selectedTab(index) {
       this.slider.slideTo(index);
     }

  goToBasket(){
    this.navCtrl.push(BasketPage, {});
  }

  changeOrderState(newOrderState: String, SearchedOrderId) {
    console.log("Hello func changeOrderState");
    this.firebaseService.changeOrderState(newOrderState,SearchedOrderId);
      setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 500);


  }
}
