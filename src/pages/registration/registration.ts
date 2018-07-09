import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Registration2Page } from '../registration2/registration2';
import { StartPage } from '../start/start';
import { BasketPage } from '../basket/basket';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public rootPage: any = StartPage;

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('data passed ', data);
      this.alert('Registrierung erfolgreich!');
      this.navCtrl.push(Registration2Page);
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

  cancelRegistration(){
    this.navCtrl.pop();
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }
}
