import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { Order } from '../../models/order/order.model'
/**
 * Generated class for the NewCustomerOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderCustomer',
  templateUrl: 'orderCustomer.html',
})
export class NewCustomerOrderPage {

  order: Order = {
    UserId: undefined,
    Name: undefined,
    Price: undefined,
    Quantity: undefined,
    Picture: 'none',
    DeliveryCosts: 0.0,
    OrderState: 'open',
    TimeStamp: 'timestampvalue',
    RestaurantId: 45,
    PayStatus: 'not paid',
    Annotations: undefined,
    TableId: 12
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCustomerOrderPage');
  }

  addCustomerOrder(order: Order) {
    this.FirebaseService.addCustomerOrder(order);
    //this.navCtrl.setRoot(''); zur Bestellübersicht leiten
  }

}
