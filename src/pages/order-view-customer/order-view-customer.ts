import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides} from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';

@Component({
  selector: 'page-order-view-customer',
  templateUrl: 'order-view-customer.html'
})

export class OrderViewCustomerPage {

  ListCategory = [];
  viewarr= [];
  UserId = this.fire.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private fire: AngularFireAuth) {
    this.firebaseService.getOrdersPerUser(this.UserId).then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log(this.viewarr);
    })
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

}
