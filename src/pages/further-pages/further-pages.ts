import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';
import { ContactPage } from '../contact/contact';
import { ImprintPage } from '../imprint/imprint';

import { BasketPage } from '../basket/basket';   
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


  changePageKontakt(){
    this.navCtrl.push(ContactPage);
  }

  changePageAGB(){
    this.navCtrl.push(TermsAndConditionsPage);
  }

  changePageDatenschutz(){
    this.navCtrl.push(PrivacyPolicyPage);
  }

  changePageImpressum(){
    this.navCtrl.push(ImprintPage);
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

}
