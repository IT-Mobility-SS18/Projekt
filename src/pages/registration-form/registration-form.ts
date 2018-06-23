import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-registration-form',
  templateUrl: 'registration-form.html',
})
export class RegistrationFormPage {
  UserId: string;
  shoppingItems: Observable<any[]>;
  newItem = '';
  arrData=[];
  items: any;
  firedata2 = firebase.database().ref('/shoppingItems');
  cart=[];
  ListCategory = [];
  temparrCat= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, public firebaseService: FirebaseService, private afd: AngularFireDatabase) {
    //this.UserId = fire.auth.currentUser.uid;
    //this.getDataFromFireBase();
    this.getAllCatList().then((res: any) => {
      this.ListCategory = res;
      this.temparrCat = res;
      console.log(this.temparrCat);
  })
  


  }
  addItem() {
    //this.firebaseService.addItem(this.newItem);
  }

  removeItem(id) {
    //this.firebaseService.removeItem(id);
  }

  getDataFromFireBase(){
    this.afd.list('/shoppingItems').valueChanges().subscribe(
      data =>{
        console.log(JSON.stringify(data));
        this.items = data;
      } 
    )
  }

  getAllCatList() {
    var promise = new Promise((resolve, reject) => {
        this.firedata2.orderByChild('uid').once('value', (snapshot) => {
            let Catdata = snapshot.val();
            let temparr = [];
            for (var key in Catdata) {
                temparr.push(Catdata[key]);
            }
            resolve(temparr);
        }).catch((err) => {
            reject(err);
        })
    })
    return promise;
}



}
