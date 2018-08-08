import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { Order } from '../../models/order/order.model';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketService } from '../../providers/basket/basket-service';
import { FaceRecognitionPage } from '../face-recognition/face-recognition';
import { AlertController } from 'ionic-angular';

//import { checkBindingNoChanges, Item } from '@angular/core/src/view/util';
//import { IonicPage } from 'ionic-angular';

@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  // Basket icon: green if empty, blue if not
  BasketStateColor = this.BasketService.BasketStateColor;

  // Items put in basket
  ItemSelection = this.BasketService.ItemSelection;

  // Amount to pay
  amount: string;

  // Initialize order and its attributes
  order: Order = {
    ItemId: undefined,
    Quantity: undefined,
    UserId: this.fire.auth.currentUser.uid,
    OrderState: 'open',
    Name: undefined,
    Price: undefined,
    TableId: 44,
    RestaurantId: 45,
    TimeStamp: '2018-xxxxx',
    Size: undefined,
    Variant: undefined,
    Annotations: undefined
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService, private fire: AngularFireAuth, private BasketService: BasketService, public alertCtrl: AlertController) {
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
    this.sumPrices();
  }

  goToPayment() {

    //Aufruf FaceRecognition page
    this.navCtrl.push(FaceRecognitionPage, {amount: this.amount, registration: false});

    //this.navCtrl.push(PaymentPage, {amount: this.amount});
  }

  cancelBasket(){
    this.navCtrl.pop();
  }

  // Unused at the moment -> was at PaymentOK
  createOrder(ItemSelection){
    for (var idIteration in ItemSelection) {
      //hier müssen alle order bestandteile rein!! später auch die oben hardgecodeden
      this.order.ItemId = ItemSelection[idIteration].ItemId;
      this.order.Quantity = ItemSelection[idIteration].Quantity;
      this.order.Name = ItemSelection[idIteration].Name;
      this.order.Price = ItemSelection[idIteration].Price;
      this.order.Size = ItemSelection[idIteration].Size;
      this.order.Variant = ItemSelection[idIteration].Variant;
      this.order.Quantity = ItemSelection[idIteration].Quantity;
      this.order.Annotations = ItemSelection[idIteration].Annotations;
      console.log('aktuelle Menge: ' + this.order.Quantity);
      this.FirebaseService.addCustomerOrder(this.order);
    }
  }

  // Sum prices of items put in the basket -> after loading and when removing an item
  sumPrices(){
    var tmpPrice = 0.0;
    for (var idIteration in this.ItemSelection){
      tmpPrice = this.ItemSelection[idIteration].Price + tmpPrice;
    }
    this.amount = tmpPrice.toFixed(2);
  }

  // Remove an item from the basket by clicking on it
  removeItem(ind) {
    this.BasketService.removeFromArray(ind);
    this.sumPrices();
    console.log(this.ItemSelection.length);
    if (this.ItemSelection.length < 1) {
      this.BasketService.checkBasketContent();
      this.navCtrl.pop();
    }
  }

  // Remove all items from the basket
  clearBasket() {
    const confirm = this.alertCtrl.create({
      title: 'Alles löschen?',
      message: 'Möchtest du alle Artikel aus dem Warenkorb entfernen?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.BasketService.removeAll();
            this.BasketService.checkBasketContent();
            this.navCtrl.pop();
          }
        },
        {
          text: 'Abbrechen',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
