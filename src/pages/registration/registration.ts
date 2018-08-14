import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, NavController, NavParams, AlertController } from 'ionic-angular';

// import pages
import { FaceRecognitionPage } from '../face-recognition/face-recognition';
import { StartPage } from '../start/start';
import { UserStartPage } from '../user-start/user-start';

// import services
import { FirebaseService } from '../../providers/firebase/firebase-service';

// import models
import { User } from '../../models/user/user.model'

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})

export class RegistrationPage {

  public rootPage: any = StartPage;

  @ViewChild('username') user;
  @ViewChild('password') password;
  @ViewChild('passwordRep') passwordRep;

  MyErrorMessage = "Ein Fehler ist aufgetreten:";
  UserId: string;
  UserMail: string;
  public myDate;

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

  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController,
    public FirebaseService: FirebaseService,
    public events: Events
  ) {    
  }

  ionViewCanEnter() {
    var myYear = new Date().getFullYear();
    var myDay = new Date().getDate();
    var myMonth = new Date().getUTCMonth()+1;
    var myMonthString = myMonth.toString();
    if (myMonthString.length === 1) {
      myMonthString = "0" + myMonth;
    }
    this.myDate = myYear + "-" + myMonthString + "-" + myDay;
  }

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  // Hide side menu when entering
  ionViewDidEnter() {
    this.menu.enable(false);
  }

  // Show side menu before leaving
  ionViewWillLeave() {
    this.menu.enable(true);
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('data passed ', data);
      console.log('user registered: ', this.user.value);
      this.UserId = this.fire.auth.currentUser.uid;
      this.MyUser.Mail = this.fire.auth.currentUser.email;
      this.addUserDataToDatabase().then(() => {
        setTimeout(() => {
          this.FirebaseService.CurrentUserFirstName=this.FirebaseService.getCurrentUserFirstName(this.fire.auth.currentUser.uid);
          var user = firebase.auth().currentUser;
          firebase.auth().languageCode = 'de';
          // send verification email
          user.sendEmailVerification().then(function() {
            // Email sent
          }).catch(function(error) {
            // An error occured
          });
        }, 2000);
      });

      // go to face recognition page -> tell face recognition where we are coming from (registration)
      this.navCtrl.push(FaceRecognitionPage, {amount: 0.0, registration: true});

    })
    .catch(error => {
      console.log('error creating user ', error);
      this.MyErrorMessage = "Ein Fehler ist aufgetreten:";
        switch (error.code) {
          case "auth/email-already-in-use":
            this.MyErrorMessage = this.MyErrorMessage + " " + "Diese E-Mail Adresse wird bereits verwendet."
            break;
          case "auth/invalid-email":
            this.MyErrorMessage = this.MyErrorMessage + " " + "Dies ist keine gültige E-Mail Adresse (Schema: markus@mueller.de)."
            break;
          case "auth/weak-password":
            this.MyErrorMessage = this.MyErrorMessage + " " + "Das Passwort erfüllt nicht die Mindestanforderungen und sollte mindestens sechs Zeichen lang sein."
            break;
        }
      this.alert(this.MyErrorMessage);
    });
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['Okay']
    }).present();
  }

  checkRegistrationFields() {
    try {
      if (this.password.value.match(this.passwordRep.value) === null || this.passwordRep.value === "") {
        this.MyErrorMessage = "Bitte alle Felder ausfüllen!";
      }
    } catch (error) {
      console.log("error PW values: " + error);
    }
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
      var myerr = JSON.stringify(error.message);
      console.log("my error ist: " + myerr);
      this.MyErrorMessage = "Bitte alle Felder (korrekt) ausfüllen!";
      this.alert(this.MyErrorMessage);
    }
  }

  // pop page from stack when clicking cancel
  cancelRegistration(){
    this.navCtrl.pop();
  }

  addUserDataToDatabase() {
    return new Promise((resolve, reject)=>{
      this.FirebaseService.addUser(this.MyUser, this.UserId);
      this.navCtrl.setRoot(UserStartPage);
      resolve(true);
    });
  }
}
