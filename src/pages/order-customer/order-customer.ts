import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, AlertController, Item, ToastController} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { Order } from '../../models/order/order.model'
import { BasketPage } from '../basket/basket';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketService } from '../../providers/basket/basket-service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

//import { IonicPage } from 'ionic-angular';
//import { isPlatformBrowser } from '@angular/common';
//import storage from "firebase";

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
  ListCategory;
  viewarr;
  HauptspeiseArr = [];
  GetraenkeArr = [];
  NachspeiseArr = [];
  ItemId = '65246b5b456bvgbrgber';
  UserId;
  test;
  ItemSelection = [];
  CurrentQuantity;
  EnteredQuantity;

  dayOfMonth;
  monthOfYear;
  year;
  hours;
  minutes;

  //Datenbank-Auswahl
  onChangeVariant(SelectedValue){
    console.log("Selected Variant", SelectedValue);
  }

  //Datenbank-Auswahl
  onChangeSize(SelectedValue){
    console.log("Selected Size", SelectedValue);
  }

  //Datenbank-Auswahl
  onChangeQuantity(SelectedValue){
    console.log("Selected Quantity", SelectedValue);
  }

  public images: any;
   @ViewChild('slider') slider: Slides;
   page = 0;

   ionViewCanEnter() {
    try {
      this.CurrentRestaurantId = this.BasketService.QRRestaurantId;
      if(this.CurrentRestaurantId == undefined) {
        console.log("CurrentRestaurantId ist undefined");
        this.presentToast();
        return false; //wichtig, dadurch bricht das Laden der Seite ab!
      }
     } catch (error) {
       console.log("Fehler bei ionViewWillEnter: ", error);
     }
   }

   ionViewWillEnter() {
    this.FillItemArray();
   }

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

   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Kein Turty Code gescannt, leg los!',
      duration: 4000,
      position: 'bottom',
      cssClass: 'toast-container'
    });
    toast.present();
  }

   async getRestaurantId() {
    try {
      this.CurrentRestaurantId = this.BasketService.QRRestaurantId;
    } catch (error) {
    console.log("BasketService problem",error);
    }
   }

   async FillItemArray() {
    await this.getRestaurantId();
    this.FirebaseService.getRestaurantItems(this.CurrentRestaurantId).then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log("FillItemArray:",this.viewarr);
      this.filterItems();
    })
   }

   goToBasket() {
    this.navCtrl.push(BasketPage);
   }

   ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

   // not in use at the moment
   selectedTab(index) {
     this.slider.slideTo(index);
   }

   // not in use at the moment
   addCustomerOrder(order: Order) {
    this.FirebaseService.addCustomerOrder(order);
  }

  // add to (temporary) basket array
    addToArray(ItemId, Name, Price, Size, Variant, Quantity, Annotations) {
      this.ItemSelection = this.BasketService.ItemSelection;
      let varOurOrderId;

      this.dayOfMonth = JSON.stringify(new Date().getDate());
      this.monthOfYear = JSON.stringify(new Date().getMonth());
      this.year = JSON.stringify(new Date().getFullYear());
      this.hours = JSON.stringify(new Date().getHours());
      this.minutes = JSON.stringify(new Date().getMinutes());
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
      //console.log("Order Customer Order OurOrderId: ", this.ItemSelection[0].OurOrderId);
      //console.log("Order Customer BasketService.ItemSelection OurOrderId: ", this.BasketService.ItemSelection[0].OurOrderId);

      this.BasketStateColor = this.BasketService.BasketStateColor;


    })
    .catch((error: any) => console.log(error));
      //console.log("uuid ist: ",varOurOrderId);
        /* this.ItemSelection.push({
          ItemId: ItemId,
          Quantity: 'myquant',
          UserId: this.fire.auth.currentUser.uid,
          OrderState: 'open',
          Name: Name,
          Price: Price,
          TableId: this.BasketService.QRTischNr,
          RestaurantId: this.BasketService.QRRestaurantId,
          TimeStamp: 'vom order customer',
          Size: 'mysize',
          Variant: 'myvariant',
          Annotations: 'myannot',
          OurOrderId: varOurOrderId
        }); */

    }

    //not in use at the moment
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
  async filterItems() {
    //alle Getränke
    for (var iterG in this.viewarr) {
      if (this.viewarr[iterG].Category == "Getränke" ) {
        this.GetraenkeArr.push(this.viewarr[iterG]);
      }
    }
    //alle Hauptspeisen
    for (var iterH in this.viewarr) {
      if (this.viewarr[iterH].Category == "Hauptspeise" ) {
        this.HauptspeiseArr.push(this.viewarr[iterH]);
      }

    }
    //alle Nachspeisen
    for (var iterN in this.viewarr) {
      if (this.viewarr[iterN].Category == "Nachspeise" ) {
        this.NachspeiseArr.push(this.viewarr[iterN]);
      }

    }
  }
}
