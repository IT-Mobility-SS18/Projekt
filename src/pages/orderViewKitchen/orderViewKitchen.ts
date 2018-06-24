import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase/firebase-service';


@Component({
  selector: 'page-orderViewKitchen',
  templateUrl: 'orderViewKitchen.html'
})

export class OrderViewKitchenPage {
  
  ListCategory = [];
  viewarr= [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    this.firebaseService.getOrdersKitchen().then((res: any) => {
      this.ListCategory = res;
      this.viewarr = res;
  })
  }
}
