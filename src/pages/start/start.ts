import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { RegistrationPage } from '../registration/registration';
import { RestaurantPage } from '../restaurant/restaurant';

//nur für Payment-Test
import { PaymentPage } from '../payment/payment';
//end

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {
  constructor(public navCtrl: NavController){}

  //nur für Payment-Test
  testPayment() {
        this.navCtrl.push(PaymentPage, {});
  }
  //end

  login(){
    this.navCtrl.push(RestaurantPage);
  }

  registration(){
    this.navCtrl.push(RegistrationPage);
  }
}
