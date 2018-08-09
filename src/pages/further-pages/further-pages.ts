import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';
import { ContactPage } from '../contact/contact';
import { ImprintPage } from '../imprint/imprint';


@Component({
  selector: 'page-further-pages',
  templateUrl: 'further-pages.html',
})
export class FurtherPagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurtherPagesPage');
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

}
