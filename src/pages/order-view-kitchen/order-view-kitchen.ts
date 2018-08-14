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

  async checkTime(){
    var tsHours:number;
    var tsMinutes:number;
    var tsNumber:number;
    var myHours:number;
    var myMinutes:number;
    var myNumber:number;
    var tmpstr:string;
    myHours = new Date().getHours(); //17
    myMinutes = new Date().getMinutes(); //35
    myNumber = myHours*60+myMinutes; //17*60+35=1055

    for (var iterI in this.viewarr) {
      tmpstr = this.viewarr[iterI].TimeStamp;
      tmpstr = tmpstr.substring(tmpstr.length-5, tmpstr.length);
      this.viewarr[iterI].TimeStamp=tmpstr;

      tsHours = +this.viewarr[iterI].TimeStamp.substring(0,2); //17
      tsMinutes = +this.viewarr[iterI].TimeStamp.substring(3,5); //4
      tsNumber = tsHours*60+tsMinutes; //17*60+4=1024

      if(myNumber-tsNumber > 20){ //1055-1024=31
        //Schreibe "red" in timecheck
        this.viewarr[iterI].timeCheck="red";
      }
      else{
        //Schreibe "black" in timecheck
        this.viewarr[iterI].timeCheck="black";
      }
    }
   }

  async filterItems() {

    await this.manipulateTimeStamp();
    await this.checkTime();

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
