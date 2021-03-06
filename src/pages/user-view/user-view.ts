import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';
import { StartPage } from '../start/start';

// import services
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { BasketService } from '../../providers/basket/basket-service';

// import models
import { User } from '../../models/user/user.model';

@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})

export class UserViewPage {

  UserId;
  inputDisabled: boolean = true;

  user: User = {
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

  viewarr= [];
  CurrentBDay;
  CurrentCity;
  CurrentCountry;
  CurrentFirstName;
  CurrentLastName;
  CurrentMail;
  CurrentOptInNewsletter;
  CurrentPhone;
  CurrentSex;
  CurrentStreet;
  CurrentZipCode;

  BasketStateColor = this.BasketService.BasketStateColor;
  PenStateColor = "#ffffff";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private fire: AngularFireAuth, 
    public FirebaseService: FirebaseService, 
    private BasketService: BasketService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  // after loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserViewPage');
  }

  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  ngOnInit() {
    this.UserId = this.fire.auth.currentUser.uid;
    this.FirebaseService.getUserData(this.UserId).then((res: any) => {
      this.viewarr = res;
      this.CurrentBDay = this.viewarr[0];
      this.CurrentCity = this.viewarr[1];
      this.CurrentCountry = this.viewarr[2];
      this.CurrentFirstName = this.viewarr[4];
      this.CurrentLastName = this.viewarr[5];
      this.CurrentMail = this.viewarr[6];
      this.CurrentOptInNewsletter = this.viewarr[7];
      this.CurrentPhone = this.viewarr[8];
      this.CurrentSex = this.viewarr[9];
      this.CurrentStreet = this.viewarr[10];
      this.CurrentZipCode = this.viewarr[11];
    })
  }

  updateUser() {
    this.user.BDay = this.CurrentBDay;
    this.user.City = this.CurrentCity;
    this.user.Country = this.CurrentCountry;
    this.user.FirstName = this.CurrentFirstName;
    this.user.LastName = this.CurrentLastName;
    this.user.Mail = this.CurrentMail;
    this.user.OptInNewsletter = this.CurrentOptInNewsletter;
    this.user.Phone = this.CurrentPhone;
    this.user.Sex = this.CurrentSex;
    this.user.Street = this.CurrentStreet;
    this.user.ZipCode = this.CurrentZipCode;
    this.FirebaseService.updateUser(this.user, this.UserId);
    this.PenStateColor = "#ffffff";
    this.navCtrl.getActive(this.inputDisabled=true);
    this.ConfirmChanges();
  }

  // go to basket page
  goToBasket(){
    this.navCtrl.push(BasketPage, {});
  }

  deleteUser() {
    const confirm = this.alertCtrl.create({
      title: 'Profil löschen?',
      message: 'Möchtest du dein Profil wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            var user = firebase.auth().currentUser;
            var userId = this.fire.auth.currentUser.uid;
            this.FirebaseService.deleteUser(user).then((result) => {
              this.FirebaseService.deleteUserPics(userId);
              this.FirebaseService.deleteDBUser(userId).then((resultDB) => {
                this.navCtrl.setRoot(StartPage);
              }).catch((err) => {
                console.log("DB Daten löschen nicht erfolgreich", err);
              })
              
            }).catch((error) => {
              console.log("Error delteUser Function", error);
              firebase.auth().signOut();
              this.presentToast();
              this.navCtrl.setRoot(StartPage);
            });
          }
        },
        {
          text: 'Abbrechen',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  // yummie, excellent toast!
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Neue Anmeldung erforderlich! Bitte danach erneut versuchen.',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-container'
    });
    toast.present();
  }

  ConfirmChanges() {
    let toast = this.toastCtrl.create({
      message: 'Gespeichert!',
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast-container'
    });
    toast.present();
  }

  // enable/disable changes
  goToSettings(){
    if(this.inputDisabled==true) {
      this.navCtrl.getActive(this.inputDisabled=false);
      this.PenStateColor = "#0094d2";
    } else if (this.inputDisabled==false){
      this.navCtrl.getActive(this.inputDisabled=true);
      this.PenStateColor = "#ffffff";
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
  }

  cancelChanges(){
    if(this.inputDisabled==false) {
      this.navCtrl.setRoot(UserViewPage);
    }
  }

}