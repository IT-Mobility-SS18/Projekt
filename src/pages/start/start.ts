import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { RegistrationPage } from '../registration/registration';
import { RestaurantPage } from '../restaurant/restaurant';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {
  constructor(public navCtrl: NavController){}


  login(){
    this.navCtrl.push(RestaurantPage);
  }

  registration(){
    this.navCtrl.push(RegistrationPage);
  }
}
