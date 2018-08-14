import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import services
import { FirebaseService } from './../../providers/firebase/firebase-service';

@Component({
  selector: 'page-order-view-kitchen',
  templateUrl: 'order-view-kitchen.html'
})

export class OrderViewKitchenPage {

  viewarr= [];
  openOrdersArr = [];
  preparingArr = [];
  readyArr = [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
  }

  // read orders from firebase
  getallOrdersFromFirebase() {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllOrders().then((res: any) => {
        this.viewarr = res;
        resolve(this.viewarr);
        reject();
      })
    })
  }

  ionViewWillEnter() {
    this.getallOrdersFromFirebase().then(() => this.filterItems());
  }

  // get only time (format xx:xx) from timestamp
  async manipulateTimeStamp(){
    var tmpstr:string;
    for (var iterH in this.viewarr) {
      tmpstr = this.viewarr[iterH].TimeStamp;
      tmpstr = tmpstr.substring(tmpstr.length-5, tmpstr.length);
      this.viewarr[iterH].TimeStamp=tmpstr;
    }
  }

  // is an order waiting too long? (over 20 minutes) -> if yes, mark red
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

    // cut values for each item
    for (var iterI in this.viewarr) {
      tmpstr = this.viewarr[iterI].TimeStamp;
      tmpstr = tmpstr.substring(tmpstr.length-5, tmpstr.length);
      this.viewarr[iterI].TimeStamp=tmpstr;

      tsHours = +this.viewarr[iterI].TimeStamp.substring(0,2); //17
      tsMinutes = +this.viewarr[iterI].TimeStamp.substring(3,5); //4
      tsNumber = tsHours*60+tsMinutes; //17*60+4=1024

      // is an order waiting longer than 20 minutes?
      if(myNumber-tsNumber > 20){ //1055-1024=31
        // write "red" in timecheck
        this.viewarr[iterI].timeCheck="red";
      }
      else{
        // write "black" in timecheck
        this.viewarr[iterI].timeCheck="black";
      }
    }
  }

  // put items into the categories
  async filterItems() {

    // waiting for the functions to be executed
    await this.manipulateTimeStamp();
    await this.checkTime();

    // open orders
    for (var iterG in this.viewarr) {
      if (this.viewarr[iterG].OrderState == "open" ) {
        this.openOrdersArr.push(this.viewarr[iterG]);
      }
    }

    // orders in preparation
    for (var iterH in this.viewarr) {
      if (this.viewarr[iterH].OrderState == "preparing" ) {
        this.preparingArr.push(this.viewarr[iterH]);
      }
    }

    // orders awaiting pickup from service
    for (var iterN in this.viewarr) {
      if (this.viewarr[iterN].OrderState == "ready" ) {
        this.readyArr.push(this.viewarr[iterN]);
      }
    }
  }

  changeOrderState(newOrderState: String, SearchedOrderId) {
    this.firebaseService.changeOrderState(newOrderState,SearchedOrderId);
    // if there would be no timeout, the change would not have been written into db but have been already read
    setTimeout(() => {
      // set active page as root (aka refresh page)
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 500);
  }

}
