import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationFormPage } from '../registration-form/registration-form';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})

export class RegistrationPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

}

registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('data passed ', data);
      this.alert('Registrierung erfolgreich!');
      this.navCtrl.push(RegistrationFormPage);
    })
    .catch(error => {
      console.log('error creating user ', error);
        this.alert('Fehler bei der Registrierung! ' + error);
    });
  	console.log('user registered: ', this.user.value);
}

alert(message: string) {
    this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['Okay']
    }).present();
}
}
