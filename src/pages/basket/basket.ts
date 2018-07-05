import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
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
  BasketStateColor: string;

  order: Order = {
    ItemId: undefined,
    Quantity: undefined,
    UserId: this.fire.auth.currentUser.uid,
    OrderState: 'open',
    Name: undefined,
    TableId: 44,
    RestaurantId: 45,
    TimeStamp: '2018-xxxxx'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService, private fire: AngularFireAuth,) {
    this.ItemSelection = navParams.get('ItemSelection');
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
    this.checkBasketContent();
  }

  goToPayment() {
    this.navCtrl.push(PaymentPage, {});
  }
  cancelBasket(){
    this.navCtrl.pop();
  }
  createOrder(ItemSelection){
    for (var idIteration in ItemSelection) {
      //hier müssen alle order bestandteile rein!! später auch die oben hardgecodeden
      this.order.ItemId = ItemSelection[idIteration].ItemId;
      this.order.Quantity = ItemSelection[idIteration].Quantity;
      this.order.Name = ItemSelection[idIteration].Name;
      console.log('aktuele Menge: ' + this.order.Quantity);
      this.FirebaseService.addCustomerOrder(this.order);
  }
  }

  checkBasketContent() {
    if (this.ItemSelection.length > 0) {
      this.BasketStateColor = "#0094d2"; //blau
    } else {
      this.BasketStateColor = "#99cc33"; //grün ios, android weiß?!
    }
  }
}
