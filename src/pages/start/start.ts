import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { UserStartPage } from '../user-start/user-start';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../providers/firebase/firebase-service';

//import { IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular'; //Side-Menu löschen

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {
  @ViewChild('username') user;
  @ViewChild('password') password;
  MyErrorMessage;
  constructor(private menu: MenuController, 
    public navCtrl: NavController,
    private alertCtrl: AlertController, 
    private fire:AngularFireAuth,
    public navParams: NavParams, 
    public FirebaseService: FirebaseService,
    private toastCtrl: ToastController){
    
  }

  ionViewDidEnter() { //beim Öffnen der Seite Side-Menu wieder ausblenden
    this.menu.enable(false);
  }
    
  ionViewWillLeave() { //beim Verlassen der Seite Side-Menu wieder einblenden
    this.menu.enable(true);
  }

  // not in use at the moment
alert(message: string) {
  this.alertCtrl.create({
    title: 'Information',
    subTitle: message,
    buttons: ['Okay']
  }).present();
}

presentToast(ExtMessage, ExtDur) {
  let toast = this.toastCtrl.create({
    message: ExtMessage,
    duration: ExtDur,
    position: 'bottom',
    cssClass: 'toast-container'
  });
  toast.present();
}

// login
userStart(){
  this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
  .then( data => {
    console.log('Login data passed', this.fire.auth.currentUser);
    //this.alert('Login erfolgreich.');
    this.presentToast("Login erfolgreich.", 1000);
    //wichtig für Anzeige der Variablen in der HTML da diese erst vorliegen müssen
    this.FirebaseService.CurrentUserFirstName=this.FirebaseService.getCurrentUserFirstName(this.fire.auth.currentUser.uid).then(()=>{ 
    this.navCtrl.setRoot( UserStartPage )
  });
  })
  .catch( error => {
    console.log('Error during login', error);
    this.MyErrorMessage = "E-Mail-Adresse oder Passwort nicht korrekt.";
    this.presentToast(this.MyErrorMessage, 2000);
  })
  console.log('User signed in: ', this.user.value);
}

// go to registration
registration(){
  this.navCtrl.push(RegistrationPage);
}
}
