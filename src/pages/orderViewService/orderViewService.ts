import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter';



@Component({
  selector: 'page-orderViewService',
  templateUrl: 'orderViewService.html'
})

export class OrderViewServicePage {

  orders = [];
  order = {};


  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider) {

    this.databaseProvider.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            this.loadOrderData();
          }
        })
  }
  loadOrderData() {
  this.databaseProvider.getAllOrders().then(data => {
    this.orders = data;
  });
  }



}
