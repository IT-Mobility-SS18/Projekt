import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import firebase from "firebase";

@Injectable()
export class FirebaseService {

  fireOrderData = firebase.database().ref('/Orders');
  OrderArray= [];

  private OrderListRef = this.dbInstance.list<Order>('Orders');

  constructor(public dbInstance: AngularFireDatabase) {

}

  getShoppingItems() {
    return this.dbInstance.list('/shoppingItems/');
  }

  addItem(name) {
    this.dbInstance.list('/shoppingItems/').push(name);
  }

  removeItem(id) {
    this.dbInstance.list('/shoppingItems/').remove(id);
  }

  addCustomerOrder(order: Order) {
    /* this.dbInstance.list('/Orders').push(order.Annotations);
    this.dbInstance.list('/Orders').push(order.DeliveryCosts);
    this.dbInstance.list('/Orders').push(order.Name);
    this.dbInstance.list('/Orders').push(order.OrderState);
    this.dbInstance.list('/Orders').push(order.PayStatus);
    this.dbInstance.list('/Orders').push(order.Picture);
    this.dbInstance.list('/Orders').push(order.Price);
    this.dbInstance.list('/Orders').push(order.Quantity);
    this.dbInstance.list('/Orders').push(order.RestaurantId);
    this.dbInstance.list('/Orders').push(order.TableId);
    this.dbInstance.list('/Orders').push(order.TimeStamp);
    this.dbInstance.list('/Orders').push(order.UserId); */
    return this.OrderListRef.push(order);
  }

  getAllOrders() {
    var promise = new Promise((resolve, reject) => {
      this.fireOrderData.orderByChild('uid').once('value', (snapshot) => {
          let OrderData = snapshot.val();
          let tmparr = [];
          for (var key in OrderData) {
              tmparr.push(OrderData[key]);
          }
          resolve(tmparr);
      }).catch((err) => {
          reject(err);
      })
  })
  return promise;
  }

}
