import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import firebase from "firebase";
import { User } from '../../models/order/user.model';
import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';

@Injectable()
export class FirebaseService {


  fireOrderData = firebase.database().ref('/Orders');
  OrderArray= [];

  private OrderListRef = this.dbInstance.list<Order>('Orders');
  UserCreationRef = firebase.database().ref('/User');
  UserListData = firebase.database().ref('/User');
  ItemListData = firebase.database().ref('/Items');

  constructor(public dbInstance: AngularFireDatabase) {

}

  removeItem(id) {
    this.dbInstance.list('/shoppingItems/').remove(id);
  }

  addCustomerOrder(order: Order) {
    //return this.OrderListRef.push(order);
    console.log('Daten werden geschrieben: ' + JSON.stringify(order));
     this.fireOrderData.push(order);

  }

  addUser(user: User, UserId) {
    this.UserCreationRef.child(UserId).set(user);
  }

  updateUser(user: User, UserId) {
    //this.UserCreationRef.child(UserId).set(user);  geht nicht mehr so da zusätzliches Attribut von Faceregcognition
    this.UserCreationRef.child(UserId).child('BDay').set(user.BDay);
    this.UserCreationRef.child(UserId).child('City').set(user.City);
    this.UserCreationRef.child(UserId).child('Country').set(user.Country);
    this.UserCreationRef.child(UserId).child('FirstName').set(user.FirstName);
    this.UserCreationRef.child(UserId).child('LastName').set(user.LastName);
    this.UserCreationRef.child(UserId).child('Mail').set(user.Mail);
    this.UserCreationRef.child(UserId).child('Phone').set(user.Phone);
    this.UserCreationRef.child(UserId).child('Sex').set(user.Sex);
    this.UserCreationRef.child(UserId).child('Street').set(user.Street);
    this.UserCreationRef.child(UserId).child('ZipCode').set(user.ZipCode);
  }

  updateUserNewsletter(CurrentOptInNewsletter, UserId) {
    this.UserCreationRef.child(UserId).child('OptInNewsletter').set(CurrentOptInNewsletter);
  }

  changeOrderState(newOrderState: String, SearchedOrderId) {
    var mykey;
    var promise = new Promise((resolve, reject) => {
      this.fireOrderData.orderByChild('OurOrderId').equalTo(SearchedOrderId).once("value", (snapshot) =>{

         snapshot.forEach((child) =>{
            mykey = child.key;
         })
          this.fireOrderData.child(mykey).child('OrderState').set(newOrderState);
      })//.catch((err) => {
         // reject(err);
         //resolve(mykey);
         //return promise;
         resolve(true);
      }
    )
  //})

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
    //FaceRec/GroupId/PersonId/#PersistedFace
    this.UserListData.child('56456nr567').child('FaceRecognition').set({
      FaceGroupId: 658675875
    });
    this.UserListData.child('56456nr567').child('FaceRecognition').child('658675875').set({
      FacePersonId: 56546545
    });
    /* this.UserListData.child('56456nr567').child('Group').child('Person').set({
      FacePersonId: 5654654
    }); */
    this.UserListData.child('56456nr567').child('FaceRecognition').child('658675875').child('56546545').push({
      PersistedFaceId: 56546456,
      PictureUrl: '/bla/bla.jpg'
    })
  }

  getPersonId(UserId,GroupId) {
    var personId:string;
    var promise = new Promise((resolve, reject) => {
      this.UserListData.child(UserId).child('FaceRecognition').child(GroupId).once('value', (snapshot) => {
        let UserData = snapshot.val();
        let tmparr = [];
        for (var key in UserData) {
            tmparr.push(UserData[key]);
        }
        if(tmparr!=null){
          personId=tmparr[0].FacePersonId;
          resolve(personId);
        } else {
          resolve('keine personId gefunden');
        }
      }).catch((err) => {
          reject(err);
      })
  })
  return promise;
  }


  getUserData(UserId) {
    var promise = new Promise((resolve, reject) => {
      this.UserListData.child(UserId).orderByChild('uid').once('value', (snapshot) => {
          let UserData = snapshot.val();
          let tmparr = [];
          for (var key in UserData) {
              tmparr.push(UserData[key]);
          }
          resolve(tmparr);
      }).catch((err) => {
          reject(err);
      })
  })
  return promise;
  }


  getRestaurantItems(CurrentRestaurantId) {
    var promise = new Promise((resolve, reject) => {
      this.ItemListData.orderByChild('RestaurantId').equalTo(CurrentRestaurantId).once('value', (snapshot) => {
          let ItemData = snapshot.val();
          let tmparr = [];
          for (var key in ItemData) {
              tmparr.push(ItemData[key]);
          }
          resolve(tmparr);
      }).catch((err) => {
          reject(err);
      })
  })
  return promise;
  }

  getOrdersPerUser(UserIdInput) {
    var promise = new Promise((resolve, reject) => {
      this.fireOrderData.orderByChild('UserId').equalTo(UserIdInput).once('value', (snapshot) => {
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
