import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase/firebase-service';


@Component({
  selector: 'page-order-view-service',
  templateUrl: 'order-view-service.html'
})

export class OrderViewServicePage {

  ListCategory = [];
  viewarr= [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    this.firebaseService.getAllOrders().then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
      console.log(this.viewarr);
    })
  }
}
