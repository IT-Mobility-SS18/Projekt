import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import firebase from "firebase";
import { User } from '../../models/order/user.model';

@Injectable()
export class FirebaseService {


  fireOrderData = firebase.database().ref('/Orders');
  OrderArray= [];

  private OrderListRef = this.dbInstance.list<Order>('Orders');
  private UserListRef = this.dbInstance.list<User>('User');
  UserCreationRef = firebase.database().ref('/User');
  UserListData = firebase.database().ref('/User/56456nr567/Group/wert');

  constructor(public dbInstance: AngularFireDatabase) {

}

  

  removeItem(id) {
    this.dbInstance.list('/shoppingItems/').remove(id);
  }

  addCustomerOrder(order: Order) {
    return this.OrderListRef.push(order);
  }

  addUser(user: User, UserId) {
    this.UserCreationRef.child(UserId).set(user);
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

  getOrdersKitchen() { 
    var promise = new Promise((resolve, reject) => {
      this.fireOrderData.orderByChild('OrderState').equalTo('open').once('value', (snapshot) => {
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

  fillFaceData() {
    var x: '658675875';
    this.UserListData.push(x);
  }

}
