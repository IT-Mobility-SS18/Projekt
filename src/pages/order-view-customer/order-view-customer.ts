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
      this.translateOrderState();
    })
  }
  

  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

  translateOrderState() {
    for(var ordit in this.viewarr) {
      if (this.viewarr[ordit].OrderState == "open") {
        this.viewarr[ordit].OrderState = "Deine Bestellung wurde aufgenommen.";
      }
      if (this.viewarr[ordit].OrderState == "ready") {
        this.viewarr[ordit].OrderState = "Deine Bestellung wird in Kürze zu dir gebracht.";
      }
      if (this.viewarr[ordit].OrderState == "done") {
        this.viewarr[ordit].OrderState = "Deine Bestellung ist abgeschlossen.";
      }
      if (this.viewarr[ordit].OrderState == "preparing") {
        this.viewarr[ordit].OrderState = "Deine Bestellung wird gerade zubereitet.";
      }
    }
   
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
