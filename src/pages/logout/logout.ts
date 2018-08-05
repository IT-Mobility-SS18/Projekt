import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { StartPage } from '../start/start';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().signOut();
    this.navCtrl.push(StartPage);
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
