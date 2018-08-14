import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController} from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

// import pages
import { BasketPage } from '../basket/basket';

// import services
import { BasketService } from '../../providers/basket/basket-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

// import models
import { Order } from '../../models/order/order.model'

@Component({
  selector: 'page-order-customer',
  templateUrl: 'order-customer.html',
})

export class OrderCustomerPage {

  BasketStateColor = this.BasketService.BasketStateColor;

  order: Order = {
    ItemId: undefined,
    Quantity: undefined,
    UserId: undefined,
    OrderState: undefined,
    Name: undefined,
    Price: undefined,
    TableId: undefined,
    RestaurantId: undefined,
    TimeStamp: undefined,
    Size: undefined,
    Variant: undefined,
    Annotations: undefined,
    OurOrderId: undefined
  }

  CurrentRestaurantId:number;
  viewarr;
  HauptspeiseArr = [];
  GetraenkeArr = [];
  NachspeiseArr = [];
  UserId;
  ItemSelection = [];

  // date specs for timestamp
  dayOfMonth;
  monthOfYear;
  year;
  hours;
  minutes;

  constructor(public navCtrl: NavController,
    public FirebaseService: FirebaseService,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController,
    private BasketService: BasketService,
    private uniqueDeviceID: UniqueDeviceID,
    private toastCtrl: ToastController
  ) {
    this.UserId = this.fire.auth.currentUser.uid;
  }

  ionViewCanEnter() {
    try {
      this.CurrentRestaurantId = this.BasketService.QRRestaurantId;
      if(this.CurrentRestaurantId == undefined) {
        console.log("CurrentRestaurantId ist undefined");
        this.presentToast();
        return false; //important! cancels site loading
      }
    } catch (error) {
      console.log("Fehler bei ionViewWillEnter: ", error);
    }
  }

  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  ionViewWillEnter() {
    this.FillItemArray();
  }

  // create toast
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Kein Turty Code gescannt, leg los!',
      duration: 4000,
      position: 'bottom',
      cssClass: 'toast-container'
    });
    toast.present();
  }

  // get restaurant id from qr code scan
  async getRestaurantId() {
    try {
      this.CurrentRestaurantId = this.BasketService.QRRestaurantId;
    } catch (error) {
      console.log("BasketService problem",error);
    }
  }

  // get restaurant items from db
  async FillItemArray() {
    await this.getRestaurantId();
    this.FirebaseService.getRestaurantItems(this.CurrentRestaurantId).then((res: any) => {
      this.viewarr = res;
      this.filterItems();
    })
  }

  // go to basket page
  goToBasket() {
    this.navCtrl.push(BasketPage);
  }

  // add to (temporary) basket array
  addToArray(ItemId, Name, Price, Size, Variant, Quantity, Annotations) {

    this.ItemSelection = this.BasketService.ItemSelection;
    let varOurOrderId;

    // get timestamp values
    this.dayOfMonth = JSON.stringify(new Date().getDate());
    this.monthOfYear = JSON.stringify(new Date().getMonth());
    this.year = JSON.stringify(new Date().getFullYear());
    this.hours = JSON.stringify(new Date().getHours());
    this.minutes = JSON.stringify(new Date().getMinutes());

    // solve problem with one digit numbers -> needs to have two digits!
    if(this.dayOfMonth.length < 2){
      this.dayOfMonth = "0" + this.dayOfMonth;
    }
    if(this.monthOfYear.length < 2){
      this.monthOfYear = "0" + this.monthOfYear;
    }
    if(this.hours.length < 2){
      this.hours = "0" + this.hours;
    }
    if(this.minutes.length < 2){
      this.minutes = "0" + this.minutes;
    }

    // deviceID needed for uuid (our orderID)
    this.uniqueDeviceID.get()
    .then((uuid: any) => varOurOrderId = uuid + new Date().getTime()).then(() => {
      console.log("uuid ist: ",varOurOrderId);
      this.ItemSelection.push({
        ItemId: ItemId,
        Quantity: 'myquant',
        UserId: this.fire.auth.currentUser.uid,
        OrderState: 'open',
        Name: Name,
        Price: Price,
        TableId: this.BasketService.QRTischNr,
        RestaurantId: this.BasketService.QRRestaurantId,
        TimeStamp: this.dayOfMonth + "." + this.monthOfYear + "." + this.year + " " + this.hours + ":" + this.minutes,
        Size: 'mysize',
        Variant: 'myvariant',
        Annotations: 'myannot',
        OurOrderId: varOurOrderId
      });

      this.BasketService.ItemSelection = this.ItemSelection;
      this.BasketService.checkBasketContent();
      this.BasketStateColor = this.BasketService.BasketStateColor;
    })
    .catch((error: any) => console.log(error));
    }

  async filterItems() {
    this.GetraenkeArr = [];
    this.HauptspeiseArr = [];
    this.NachspeiseArr = [];
    // drinks
    for (var iterG in this.viewarr) {
      if (this.viewarr[iterG].Category == "Getränke" ) {
        this.GetraenkeArr.push(this.viewarr[iterG]);
      }
    }
    // main courses
    for (var iterH in this.viewarr) {
      if (this.viewarr[iterH].Category == "Hauptspeise" ) {
        this.HauptspeiseArr.push(this.viewarr[iterH]);
      }
    }
    // desserts
    for (var iterN in this.viewarr) {
      if (this.viewarr[iterN].Category == "Nachspeise" ) {
        this.NachspeiseArr.push(this.viewarr[iterN]);
      }
    }
  }
}
