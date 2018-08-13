import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { BasketPage } from '../basket/basket';


@Component({
  selector: 'page-order-view-kitchen',
  templateUrl: 'order-view-kitchen.html'
})

export class OrderViewKitchenPage {

  ListCategory = [];
  viewarr= [];
  openOrdersArr = [];
  preparingArr = [];
  readyArr = [];

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

  goToBasket(){
    this.navCtrl.push(BasketPage, {});
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
     //await this.getallOrdersFromFirebase();
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
  }

  changeOrderState(newOrderState: String, SearchedOrderId) {
    console.log("Hello func changeOrderState");
    this.firebaseService.changeOrderState(newOrderState,SearchedOrderId);//.then(() => {
      setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 500);
    //}
   // )

  }

  testFunc() {
    console.log("Hello func testFunc");
    //console.log(item);

  }
}
