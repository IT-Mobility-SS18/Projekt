import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Registration2Page } from '../registration2/registration2';
import { StartPage } from '../start/start';
import { BasketPage } from '../basket/basket';
import { User } from '../../models/order/user.model'
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { UserStartPage } from '../user-start/user-start';

//import { IonicPage } from 'ionic-angular';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public rootPage: any = StartPage;

  @ViewChild('username') user;
  @ViewChild('password') password;

  onChangeSex(SelectedValue){
    console.log("Selected Sex", SelectedValue);
  }

  onChangeOptInNewsletter(SelectedValue){
    console.log("Selected OptInNewsletter", SelectedValue);
  }

  UserId: string;
  UserMail: string;
  MyUser: User = {
    FirstName: undefined,
    LastName: undefined,
    Street: undefined,
    ZipCode: undefined,
    City: undefined,
    Country: undefined,
    Phone: undefined,
    Sex: undefined,
    Mail: undefined,
    OptInNewsletter: undefined,
    BDay: undefined
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController, public FirebaseService: FirebaseService) {
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('data passed ', data);
      this.alert('Registrierung erfolgreich!');
      this.UserId = this.fire.auth.currentUser.uid;
      this.MyUser.Mail = this.fire.auth.currentUser.email;
      this.addUserDataToDatabase();
    })
    .catch(error => {
      console.log('error creating user ', error);
      this.alert('Fehler bei der Registrierung! ' + error);
    });
    console.log('user registered: ', this.user.value);
  }

  // not in use at the moment
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

  addUserDataToDatabase() {
    this.FirebaseService.addUser(this.MyUser, this.UserId);
    this.navCtrl.setRoot(UserStartPage);

  }
}
