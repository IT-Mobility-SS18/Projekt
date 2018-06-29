import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { Order } from '../../models/order/order.model';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  ItemSelection = [];

  order: Order = {
    ItemId: undefined,
    Quantity: undefined,
    UserId: this.fire.auth.currentUser.uid,
    OrderState: 'open'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService, private fire: AngularFireAuth,) {
    this.ItemSelection = navParams.get('ItemSelection');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  goToPayment() {
    this.navCtrl.push(PaymentPage, {});
  }
  cancelBasket(){
    this.navCtrl.pop();
  }
  createOrder(ItemSelection){
    for (var idIteration in ItemSelection) {
      this.order.ItemId = ItemSelection[idIteration].ItemId;
      this.order.Quantity = ItemSelection[idIteration].Quantity;
      console.log('aktuele Menge: ' + this.order.Quantity);
      this.FirebaseService.addCustomerOrder(this.order);
  }
  }
}
