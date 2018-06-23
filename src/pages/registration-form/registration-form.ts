import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the RegistrationFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration-form',
  templateUrl: 'registration-form.html',
})
export class RegistrationFormPage {
  UserId: string;
  shoppingItems: FirebaseListObservable<any[]>;
  newItem = '';
  arrData=[];
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, public firebaseService: FirebaseService, private afd: AngularFireDatabase) {
    //this.UserId = fire.auth.currentUser.uid;
    this.getDataFromFireBase()


  }
  addItem() {
    this.firebaseService.addItem(this.newItem);
  }

  removeItem(id) {
    this.firebaseService.removeItem(id);
  }

  getDataFromFireBase(){
    this.afd.list('/shoppingItems').valueChanges().subscribe(
      data =>{
        console.log(JSON.stringify(data))
        this.items = data;
      }
    )
  }
}
