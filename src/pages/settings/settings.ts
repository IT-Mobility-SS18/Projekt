import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';

// import services
import { BasketService } from '../../providers/basket/basket-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

// import models
import { User } from '../../models/user/user.model';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  UserId;
  viewarr= [];
  CurrentOptInNewsletter;
  isYesSelected = false;
  isNoSelected = false;
  PenStateColor = "#ffffff";
  user: User = {
    FirstName: 'undefined',
    LastName: 'undefined',
    Street: 'undefined',
    ZipCode: 'undefined',
    City: 'undefined',
    Country: 'undefined',
    Phone: 'undefined',
    Sex: 'undefined',
    Mail: 'undefined',
    OptInNewsletter: 'undefined',
    BDay: 'undefined'
  }

  CurrentBDay;
  CurrentCity;
  CurrentCountry;
  CurrentFirstName;
  CurrentLastName;
  CurrentMail;
  CurrentPhone;
  CurrentSex;
  CurrentStreet;
  CurrentZipCode;

  inputDisabled: boolean = true;
  BasketStateColor = this.BasketService.BasketStateColor;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fire: AngularFireAuth,
    public FirebaseService: FirebaseService,
    private BasketService: BasketService,
    private toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
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

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  // go to basket page
  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  // create toast
  ConfirmChanges() {
    let toast = this.toastCtrl.create({
      message: 'Gespeichert!',
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast-container'
    });
    toast.present();
  }

  // write changes to db
  updateUser() {
    this.FirebaseService.updateUserNewsletter(this.CurrentOptInNewsletter, this.UserId);
    this.PenStateColor = "#ffffff";
    this.navCtrl.getActive(this.inputDisabled=true);
    this.ConfirmChanges();
  }

  // enable/disable settings
  goToSettings(){
    if(this.inputDisabled==true) {
      this.navCtrl.getActive(this.inputDisabled=false);
      this.PenStateColor = "#0094d2";
    } else if (this.inputDisabled==false){
      this.navCtrl.getActive(this.inputDisabled=true);
      this.PenStateColor = "#ffffff";
    }
  }

  // reload settings page (don't save changes!)
  cancelChanges(){
    if(this.inputDisabled==false) {
      this.navCtrl.setRoot(SettingsPage);
    }
  }

}
