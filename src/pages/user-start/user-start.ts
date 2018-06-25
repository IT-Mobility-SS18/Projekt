import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-user-start',
  templateUrl: 'user-start.html'
})

export class UserStartPage {
  username: string;
  UserId: string;
  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.username = fire.auth.currentUser.email;
    this.UserId = fire.auth.currentUser.uid;
  }
}
