import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BasketPage } from '../basket/basket';  
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { User } from '../../models/order/user.model';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private fire: AngularFireAuth,public FirebaseService: FirebaseService) {
    
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
      console.log("Array viewarr: " ,this.viewarr);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  
  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  updateUser() {
    /* this.user.BDay = this.CurrentBDay;
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
    this.FirebaseService.updateUser(this.user, this.UserId); */
    this.FirebaseService.updateUserNewsletter(this.CurrentOptInNewsletter, this.UserId);
  }

  //Datenbank-Auswahl
  onChangeOptInNewsletter(SelectedValue){
    console.log("Selected OptInNewsletter", SelectedValue);
  }

  
}
