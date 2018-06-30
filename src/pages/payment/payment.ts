import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { paypalConfig } from '../../environment';
import { BasketPage } from '../basket/basket';

import { PaymentConfirmationPage } from '../payment-confirmation/payment-confirmation';

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

  constructor(private payPal: PayPal, public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');

      //init: You must preconnect to PayPal to prepare the device for processing payments. This improves the user experience, by making the presentation of the UI faster. The preconnect is valid for a limited time, so the recommended time to preconnect is on page load.
      this.payPal.init({
    PayPalEnvironmentProduction: paypalConfig.PayPalEnvironmentProduction,
    PayPalEnvironmentSandbox: paypalConfig.PayPalEnvironmentSandbox
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction

    //prepareToRender: You must preconnect to PayPal to prepare the device for processing payments. This improves the user experience, by making the presentation of the UI faster. The preconnect is valid for a limited time, so the recommended time to preconnect is on page load.
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment('3.33', 'EUR', 'Description', 'sale');

      //renderSinglePaymentUI: Start PayPal UI to collect payment from the user. See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/ for more documentation of the params.
      this.payPal.renderSinglePaymentUI(payment).then(() => {
        this.navCtrl.push(PaymentConfirmationPage);
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
        // Wenn ein User die Zahlung abbricht
        this.navCtrl.pop();
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

}
