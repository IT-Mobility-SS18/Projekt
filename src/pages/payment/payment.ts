import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { paypalConfig } from '../../environment';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';
import { OrderViewCustomerPage } from '../order-view-customer/order-view-customer';

//import { IonicPage } from 'ionic-angular';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  paymentAmount: string;
  // Items put in basket
  ItemSelection = this.BasketService.ItemSelection;

  constructor(private payPal: PayPal, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private BasketService: BasketService) { 
    this.paymentAmount = navParams.get('amount');
    

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
        let payment = new PayPalPayment(this.paymentAmount, 'EUR', 'Description', 'sale');
  
        //renderSinglePaymentUI: Start PayPal UI to collect payment from the user. See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/ for more documentation of the params.
        this.payPal.renderSinglePaymentUI(payment).then(() => {
  
          // Successfully paid
          this.BasketService.createOrder(this.ItemSelection);
          this.BasketService.removeAll();
          this.navCtrl.push(OrderViewCustomerPage);
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

  // After loading the page
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  goToBasket(){
    this.navCtrl.push(BasketPage, {});
  }

}
