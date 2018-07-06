import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { User } from '../../models/order/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { BasketPage } from '../basket/basket';




@Component({
  selector: 'page-userView',
  templateUrl: 'userView.html',
})

export class UserViewPage {
  //public user: {name: string, company: string, birthdate?: number};
  dob: any;
  age: any;
  showProfile: boolean;
  UserId;
  NewFirstName;

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

  ListCategory = [];
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, public FirebaseService: FirebaseService) {
    //this.user = {name: undefined, company: undefined, birthdate: undefined};
    this.dob = undefined;


    this.UserId = this.fire.auth.currentUser.uid;

    this.FirebaseService.getUserData(this.UserId).then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      this.CurrentBDay = this.viewarr[0];
      this.CurrentCity = this.viewarr[1];
      this.CurrentCountry = this.viewarr[2];
      this.CurrentFirstName = this.viewarr[3];
      this.CurrentLastName = this.viewarr[4];
      this.CurrentMail = this.viewarr[5];
      this.CurrentOptInNewsletter = this.viewarr[6];
      this.CurrentPhone = this.viewarr[7];
      this.CurrentSex = this.viewarr[8];
      this.CurrentStreet = this.viewarr[9];
      this.CurrentZipCode = this.viewarr[10];
    })
    //var item1 = this.viewarr.find(i => i.id == 1);

  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad UserViewPage');
    let user = JSON.parse(localStorage.getItem('USER'));
    if (user){
      this.user = user;
      this.age = this.getAge(this.user.birthdate);
      this.dob = new Date(this.user.birthdate).toISOString();
    }
  }

  cancelChanges(){
    this.user = {name: null, company: null, birthdate: null};
    this.dob = null;
    this.showProfile = false;
  }

  save(){
    this.user.birthdate = new Date(this.dob).getTime();
    this.age = this.getAge(this.user.birthdate);
    this.showProfile = true;
    localStorage.setItem('USER', JSON.stringify(this.user));
  } */

  getAge(birthdate){
    let currentTime = new Date().getTime();
     return ((currentTime - birthdate)/31556952000).toFixed(0);
  }

  logout() {
    firebase.auth().signOut();
  }

  updateUser() {
    this.FirebaseService.updateUser(this.user, this.UserId);
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }
}
