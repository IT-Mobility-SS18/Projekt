import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';
import { UserStartPage } from '../user-start/user-start';

//import { ViewChild } from '@angular/core';
//import { Slides } from 'ionic-angular';

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

  // not in use at the moment
  details() {
    const alert = this.alertCtrl.create({
      title: 'Text',
      subTitle: 'Text',
      buttons: ['OK']
    });
    alert.present();
  }

  //Weiterleitung auf die Startseite
  cancelPage(){
    this.navCtrl.setRoot(UserStartPage);
  }
}
