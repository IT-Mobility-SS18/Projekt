import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { UserStartPage } from '../user-start/user-start';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../providers/firebase/firebase-service';

//import { IonicPage } from 'ionic-angular';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {
  @ViewChild('username') user;
  @ViewChild('password') password;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, private fire:AngularFireAuth,public navParams: NavParams, public FirebaseService: FirebaseService){
    
  }

ionViewDidLoad() {
}

alert(message: string) {
  this.alertCtrl.create({
    title: 'Information',
    subTitle: message,
    buttons: ['Okay']
  }).present();
}

userStart(){
  this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
  .then( data => {
    console.log('Login data passed', this.fire.auth.currentUser);
    this.alert('Login erfolgreich.');
    this.navCtrl.setRoot( UserStartPage );
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
