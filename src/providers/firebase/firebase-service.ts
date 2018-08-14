import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

// import models
import { Order } from '../../models/order/order.model';
import { User } from '../../models/user/user.model';

@Injectable()
export class FirebaseService {

  UserListData = firebase.database().ref('/User');
  ItemListData = firebase.database().ref('/Items');
  OrderListData = firebase.database().ref('/Orders');
  OrderArray= [];

  public CurrentUserFirstName:any;

  constructor(public dbInstance: AngularFireDatabase) {
  }

  deleteUser(user) {
    var promise = new Promise((resolve, reject) => {   
      //from auth
      user.delete().then(function(){
        resolve();
      }).catch(function(error) {
        console.log("Auth: Error beim Löschen vom User!", error);
        if (error.code === "auth/requires-recent-login") {
          console.log("Error auth/requires-recent-login");
          reject(error);
        }
      })
    });
    return promise;   
  }

  deleteDBUser(UserId) {
    return new Promise((resolve, reject)=>{
      this.UserListData.child(UserId).remove((result) => {
        resolve(result);
      }), err => { 
        reject(err);
      }    
    });
  }

  deleteUserPics(userId) {
    var promise = new Promise((resolve, reject) => { 
      try {
        firebase.storage().ref().child('UserPictures/').child(userId).delete().catch((error) =>{
          console.log("Error beim Löschen von UserPics durch Firebase!", error);
          resolve();
          return promise;
        })
        resolve();
      } catch (error) {
        console.log("Error beim Löschen von UserPics!", error);
        resolve();
        return promise;
      }
    });
    return promise;
  }

  addCustomerOrder(order: Order) {
    console.log('Daten werden geschrieben: ' + JSON.stringify(order));
     this.OrderListData.push(order);
  }

  addUser(user: User, UserId) {
    this.UserListData.child(UserId).set(user);
  }

  updateUser(user: User, UserId) {
    this.UserListData.child(UserId).child('BDay').set(user.BDay);
    this.UserListData.child(UserId).child('City').set(user.City);
    this.UserListData.child(UserId).child('Country').set(user.Country);
    this.UserListData.child(UserId).child('FirstName').set(user.FirstName);
    this.UserListData.child(UserId).child('LastName').set(user.LastName);
    this.UserListData.child(UserId).child('Mail').set(user.Mail);
    this.UserListData.child(UserId).child('Phone').set(user.Phone);
    this.UserListData.child(UserId).child('Sex').set(user.Sex);
    this.UserListData.child(UserId).child('Street').set(user.Street);
    this.UserListData.child(UserId).child('ZipCode').set(user.ZipCode);
  }

  updateUserNewsletter(CurrentOptInNewsletter, UserId) {
    this.UserListData.child(UserId).child('OptInNewsletter').set(CurrentOptInNewsletter);
  }

  changeOrderState(newOrderState: String, SearchedOrderId) {
    var mykey;
    var promise = new Promise((resolve, reject) => {
      this.OrderListData.orderByChild('OurOrderId').equalTo(SearchedOrderId).once("value", (snapshot) =>{
         snapshot.forEach((child) =>{
            mykey = child.key;
         })
        this.OrderListData.child(mykey).child('OrderState').set(newOrderState);
      })
      resolve(true);
    })
  }

  getAllOrders() {
    var promise = new Promise((resolve, reject) => {
      this.OrderListData.orderByChild('uid').once('value', (snapshot) => {
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

  getCurrentUserFirstName(UserId) {
    var promise = new Promise((resolve, reject) => {
      this.UserListData.child(UserId).orderByChild('uid').once('value', (snapshot) => {
        let UserData = snapshot.val();
        let tmparr = [];
        for (var key in UserData) {
          tmparr.push(UserData[key]);
        }
        if(tmparr!=null){
          this.CurrentUserFirstName=tmparr[4];
          resolve(true);
        } else {
          resolve('kein CurrentUserName gefunden');
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
      this.OrderListData.orderByChild('UserId').equalTo(UserIdInput).once('value', (snapshot) => {
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