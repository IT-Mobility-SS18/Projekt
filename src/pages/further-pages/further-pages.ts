import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';  
import { ContactPage } from '../contact/contact';
import { ImprintPage } from '../imprint/imprint';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';

// import services
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-further-pages',
  templateUrl: 'further-pages.html',
})

export class FurtherPagesPage {
  
  BasketStateColor = this.BasketService.BasketStateColor;

  constructor(public navCtrl: NavController, public navParams: NavParams,private BasketService: BasketService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurtherPagesPage');
  }

  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  // go to contact page
  changePageKontakt(){
    this.navCtrl.push(ContactPage);
  }

  // go to t&c page
  changePageAGB(){
    this.navCtrl.push(TermsAndConditionsPage);
  }

  // go to privacy policy page
  changePageDatenschutz(){
    this.navCtrl.push(PrivacyPolicyPage);
  }

  // go to imprint page
  changePageImpressum(){
    this.navCtrl.push(ImprintPage);
  }

  // go to basket page
  goToBasket() {
    this.navCtrl.push(BasketPage);
  }

}
