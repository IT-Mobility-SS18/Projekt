import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(private payPal: PayPal) { }

    //PayPalEnvironmentProduction: //'Aab8rhQBhpjiOjM8sk9JQNgm-AL0KPBugyfqBbktAT34D1TesXi06GtT-uSTCT9QmP2mEjt2bpDhJ7RR',
    //PayPalEnvironmentSandbox: //'AW02jYvUMoGLK8J9zM35l3-e5zg0skvBzgsAhkzIF5TursbcHmAmn1nVD55IsJnEDtjG1p7ZjTFfJBBR'

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
