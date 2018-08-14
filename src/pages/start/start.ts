import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, ToastController} from 'ionic-angular';

//import pages
import { RegistrationPage } from '../registration/registration';
import { UserStartPage } from '../user-start/user-start';

// import services
import { FirebaseService } from '../../providers/firebase/firebase-service';

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
    private fire:AngularFireAuth,
    public navParams: NavParams, 
    public FirebaseService: FirebaseService,
    private toastCtrl: ToastController,
    ){
  }

  // hide side menu when entering
  ionViewDidEnter() {
    this.menu.enable(false);
  }
    
  // show side menu before leaving
  ionViewWillLeave() {
    this.menu.enable(true);
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
      this.presentToast("Login erfolgreich.", 1000);
      // important for showing of the variables in html because they have to be read
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
