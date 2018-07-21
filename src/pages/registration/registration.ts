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

  MyErrorMessage = "Ein Fehler ist aufgetreten:";
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
      console.log('user registered: ', this.user.value);
      this.UserId = this.fire.auth.currentUser.uid;
      this.MyUser.Mail = this.fire.auth.currentUser.email;
      this.addUserDataToDatabase();
    })
    .catch(error => {
      console.log('error creating user ', error);
      this.MyErrorMessage = "Ein Fehler ist aufgetreten:";
        switch (error.code) {
              case "auth/email-already-in-use":
              this.MyErrorMessage = this.MyErrorMessage + " " + "Diese E-Mail Adresse wird bereits verwendet."
              case "auth/invalid-email":
              this.MyErrorMessage = this.MyErrorMessage + " " + "Dies ist keine gültige E-Mail Adresse (Schema: markus@mueller.de)."
              case "auth/weak-password":
              this.MyErrorMessage = this.MyErrorMessage + " " + "Das Passwort erfüllt nicht die Mindestanforderungen und sollte mindestens sechs Zeichen lang sein."
        }
        
      this.alert(this.MyErrorMessage);
    }); 
  }

  // is and was in use!
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['Okay']
    }).present();
  }

  checkRegistrationFields() {
    console.log("entered checkRegistrationFields ");
    try {
    if (this.MyUser.FirstName == undefined) {
     throw Error("missingFirstName");
    }
    if (this.MyUser.LastName == undefined) {
      throw Error("missingLastName");
     }
     if (this.MyUser.Sex == undefined) {
      throw Error("missingSex");
     }
     if (this.MyUser.BDay == undefined) {
      throw Error("missingBDay");
     }
     if (this.MyUser.Street == undefined) {
      throw Error("missingStreet");
     }
     if (this.MyUser.ZipCode == undefined) {
      throw Error("missingZipCode");
     }
     if (this.MyUser.City == undefined) {
      throw Error("missingCity");
     }
     if (this.MyUser.Country == undefined) {
      throw Error("missingCountry");
     }
     if (this.MyUser.Phone == undefined) {
      throw Error("missingPhone");
     }
     if (this.MyUser.OptInNewsletter == undefined) {
      throw Error("missingOptInNewsletter");
     }
     this.registerUser();
    } catch (error) {
      switch(Error) {
        case Error: "missingFirstName"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Vorname angegeben."
        case Error: "missingLastName"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Nachname angegeben."
        case Error: "missingSex"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Geschlecht angegeben."
        case Error: "missingBDay"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Geburtsdatum angegeben."
        case Error: "missingStreet"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Straße angegeben."
        case Error: "missingZipCode"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Postleitzahl angegeben."
        case Error: "missingCity"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Stadt angegeben."
        case Error: "missingCountry"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Land angegeben."
        case Error: "missingPhone"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Telefonnummer angegeben."
        case Error: "missingOptInNewsletter"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Angabe zum Newsletter gemacht."
  }
  this.alert(this.MyErrorMessage);
    }
    
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
