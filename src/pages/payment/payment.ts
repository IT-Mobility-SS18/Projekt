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

      this.payPal.init({
    PayPalEnvironmentProduction: 'Aab8rhQBhpjiOjM8sk9JQNgm-AL0KPBugyfqBbktAT34D1TesXi06GtT-uSTCT9QmP2mEjt2bpDhJ7RR',
    PayPalEnvironmentSandbox: 'AW02jYvUMoGLK8J9zM35l3-e5zg0skvBzgsAhkzIF5TursbcHmAmn1nVD55IsJnEDtjG1p7ZjTFfJBBR'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment('3.33', 'EUR', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then(() => {
        // Successfully paid

        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, () => {
        // Error or render dialog closed without being successful
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });
  }

}
