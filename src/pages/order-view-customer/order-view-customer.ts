import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';

@Component({
  selector: 'page-order-view-customer',
  templateUrl: 'order-view-customer.html'
})

export class OrderViewCustomerPage {

  ListCategory = [];
  viewarr= [];
  UserId = this.fire.auth.currentUser.uid;
  BasketStateColor = this.BasketService.BasketStateColor;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private fire: AngularFireAuth, private BasketService: BasketService, public alertCtrl: AlertController) {
    this.firebaseService.getOrdersPerUser(this.UserId).then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log(this.viewarr);
    })
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

  details() {
    const alert = this.alertCtrl.create({
      title: 'Text',
      subTitle: 'Text',
      buttons: ['OK']
    });
    alert.present();
  }

}
