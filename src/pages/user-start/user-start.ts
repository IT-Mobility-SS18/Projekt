import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Slides} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';



@Component({
  selector: 'page-user-start',
  templateUrl: 'user-start.html'
})

export class UserStartPage {
  public images: any;
  @ViewChild('slider') slider: Slides;
  page = 0;
  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.username = fire.auth.currentUser.email;
    this.UserId = fire.auth.currentUser.uid;
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }
  username: string;
  UserId: string;
  
}
