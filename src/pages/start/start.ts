import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController} from 'ionic-angular';

import { RegistrationPage } from '../registration/registration';
import { RestaurantPage } from '../restaurant/restaurant';
import { AngularFireAuth } from 'angularfire2/auth';

//nur für Payment-Test
import { PaymentPage } from '../payment/payment';
//end

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {
  @ViewChild('username') user;
  @ViewChild('password') password;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, private fire:AngularFireAuth,public navParams: NavParams){}

  //nur für Payment-Test
  testPayment() {
        this.navCtrl.push(PaymentPage, {});
  }
  //end

  alert(message: string) {
      this.alertCtrl.create({
        title: 'Information',
        subTitle: message,
        buttons: ['Okay']
      }).present();
  }

  login(){
    //this.navCtrl.push(RestaurantPage);
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
    .then( data => {
      console.log('Login data passed', this.fire.auth.currentUser);
      this.alert('Login erfolgreich.');
      this.navCtrl.setRoot( RestaurantPage );
    })
    .catch( error => {
      console.log('Error during login', error);
      this.alert(error.message);
    })
  	console.log('User signed in: ', this.user.value);
}
  

  registration(){
    this.navCtrl.push(RegistrationPage);
  }
}
