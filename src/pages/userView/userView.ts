import { AngularFireAuthModule } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-userView',
  templateUrl: 'userView.html',
})

export class UserViewPage {
  public user: {name: string, company: string, birthdate?: number};
  dob: any;
  age: any;
  showProfile: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {name: undefined, company: undefined, birthdate: undefined};
    this.dob = undefined;
  }

  ionViewDidLoad() {
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
  }

  getAge(birthdate){
    let currentTime = new Date().getTime();
     return ((currentTime - birthdate)/31556952000).toFixed(0);
  }
}
