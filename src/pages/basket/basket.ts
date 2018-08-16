import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Component, NgZone } from '@angular/core';

// import pages
import { FaceRecognitionPage } from '../face-recognition/face-recognition';
import { OrderCustomerPage } from '../order-customer/order-customer';

// import services
import { BasketService } from '../../providers/basket/basket-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

// import models
import { Order } from '../../models/order/order.model';

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

  // Button status
  inputDisabled: boolean = true;

  // Initialize order and its attributes
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public FirebaseService: FirebaseService, 
    private BasketService: BasketService, 
    public alertCtrl: AlertController,
    private zone: NgZone) {
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
    // Sum prices of the items put in the basket
    this.sumPrices();
  }

  ionViewWillEnter(){
    // Set button status before entering
    this.updateButtonState();
  }

  // Disable payment & clear button if there is no item in the basket
  updateButtonState(){
    if (this.BasketService.ItemSelection.length > 0) {
      this.inputDisabled=false;
    }
    else {
      this.inputDisabled=true;
    }
  }


  goToPayment() {
    // Call FaceRecognition page
    this.navCtrl.push(FaceRecognitionPage, {amount: this.amount, registration: false});
  }

  // When cancel button is pressed
  cancelBasket(){
    // Pop basket page and go to the page shown before
    this.navCtrl.pop();
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
    this.zone.run(() => {
      //force update the screen
      this.sumPrices();
    });
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
            this.navCtrl.setRoot(OrderCustomerPage);
          }
        },
        {
          text: 'Abbrechen',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

}
