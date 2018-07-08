import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { Order } from '../../models/order/order.model';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketService } from '../../providers/basket/basket-service';
import { checkBindingNoChanges } from '@angular/core/src/view/util';


@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  BasketStateColor = this.BasketService.BasketStateColor;
  ItemSelection = this.BasketService.ItemSelection;
  amount: string;

  order: Order = {
    ItemId: undefined,
    Quantity: undefined,
    UserId: this.fire.auth.currentUser.uid,
    OrderState: 'open',
    Name: undefined,
    Price: undefined,
    TableId: 44,
    RestaurantId: 45,
    TimeStamp: '2018-xxxxx'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService, private fire: AngularFireAuth, private BasketService: BasketService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
    this.sumPrices();
  }

  goToPayment() {
    this.navCtrl.push(PaymentPage, {amount: this.amount});
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
      this.order.Price = ItemSelection[idIteration].Price;
      console.log('aktuelle Menge: ' + this.order.Quantity);
      this.FirebaseService.addCustomerOrder(this.order);
    }
  }

  sumPrices(){
    var tmpPrice = 0.0;
    for (var idIteration in this.ItemSelection){
      tmpPrice = this.ItemSelection[idIteration].Price + tmpPrice;
    }
    this.amount = tmpPrice.toFixed(2);
  }

  removeItem(ind) {
    this.BasketService.removeFromArray(ind);
    this.sumPrices();
    console.log(this.ItemSelection.length);
    if (this.ItemSelection.length < 1) {
      this.BasketService.checkBasketContent();
      this.navCtrl.pop();
    }
  }

  clearBasket() {
    this.BasketService.removeAll();
    this.BasketService.checkBasketContent();
    this.navCtrl.pop();
  }
}
