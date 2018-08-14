import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';
import { UserStartPage } from '../user-start/user-start';

// import services
import { BasketService } from '../../providers/basket/basket-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Component({
  selector: 'page-order-view-customer',
  templateUrl: 'order-view-customer.html'
})

export class OrderViewCustomerPage {

  viewarr= [];
  UserId = this.fire.auth.currentUser.uid;
  BasketStateColor = this.BasketService.BasketStateColor;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private fire: AngularFireAuth, private BasketService: BasketService, public alertCtrl: AlertController) {
    this.firebaseService.getOrdersPerUser(this.UserId).then((res: any) => {
      this.viewarr = res;
      this.translateOrderState();
    })
  }
  
  // refresh basket state color
  ionViewDidEnter(){
    this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  // go to basket page
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

  // go to qr code page
  cancelPage(){
    this.navCtrl.setRoot(UserStartPage);
  }

}
