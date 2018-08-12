import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { StartPage } from '../start/start';
import { BasketPage } from '../basket/basket';
import { User } from '../../models/order/user.model'
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { UserStartPage } from '../user-start/user-start';

//import { IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular'; //Side-Menu löschen

//bei FaceRecognition registrieren
import { FaceRecognitionPage } from '../face-recognition/face-recognition';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public rootPage: any = StartPage;

  @ViewChild('username') user;
  @ViewChild('password') password;
  @ViewChild('passwordRep') passwordRep;

  //Datenbank-Auswahl
  onChangeSex(SelectedValue){
    console.log("Selected Sex", SelectedValue);
  }

  //Datenbank-Auswahl
  onChangeOptInNewsletter(SelectedValue){
    console.log("Selected OptInNewsletter", SelectedValue);
  }

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
    console.log('hello registration page');
    
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
    console.log('myDate', this.myDate);
  }
  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  ionViewDidEnter() { //beim Öffnen der Seite Side-Menu wieder ausblenden
    this.menu.enable(false);
  }

  ionViewWillLeave() { //beim Verlassen der Seite Side-Menu wieder einblenden
    this.menu.enable(true);
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


      console.log('starting event: ');
      // publish an event when a user is created to register in FaceRecognition
      //this.events.publish('user:created', this.UserId, Date.now());
      //FaceRecognitionPage.registrieren();

      //Aufruf FaceRecognition page
      this.navCtrl.push(FaceRecognitionPage, {amount: 0.0, registration: true});

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
    console.log("this.MyUser.BDay",this.MyUser.BDay);
    try {
        if (this.password.value.match(this.passwordRep.value) === null || this.passwordRep.value === "") {
        //this.alert("Die eingegebenen Passwörter stimmen nicht überein!");
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
      //this.MyErrorMessage = "Ein Fehler ist aufgetreten:";
      //console.log("error ist: " + error);

      var myerr = JSON.stringify(error.message);
      console.log("my error ist: " + myerr);
        this.MyErrorMessage = "Bitte alle Felder (korrekt) ausfüllen!";
        this.alert(this.MyErrorMessage);
      }
      /* switch(myerr) {
        case "missingFirstName":
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Vorname angegeben.";
        break;
        case error: "missingLastName"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Nachname angegeben.";
        break;
        case error: "missingSex"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Geschlecht angegeben.";
        case error: "missingBDay"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Geburtsdatum angegeben.";
        case error: "missingStreet"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Straße angegeben.";
        case error: "missingZipCode"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Postleitzahl angegeben.";
        case error: "missingCity"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Stadt angegeben.";
        case error: "missingCountry"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde kein Land angegeben.";
        case error: "missingPhone"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Telefonnummer angegeben.";
        case error: "missingOptInNewsletter"
        this.MyErrorMessage = this.MyErrorMessage + " " + "Es wurde keine Angabe zum Newsletter gemacht."; */
        //case Error: "differentPasswords"
        //this.MyErrorMessage = this.MyErrorMessage + " " + "Die eingegebenen Passwörter stimmen nicht überein."


    }



  cancelRegistration(){
    this.navCtrl.pop();
  }


  addUserDataToDatabase() {
    this.FirebaseService.addUser(this.MyUser, this.UserId);
    this.navCtrl.setRoot(UserStartPage);

  }
}
