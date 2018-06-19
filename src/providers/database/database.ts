import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';



@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'AppDB.db',
        location: 'default',
        createFromLocation: 1
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.storage.get('database_filled').then(val => {
          if (val) {
            this.databaseReady.next(true);
          } else {
            this.fillDatabase();
          }
        })
      });
    });
  }

  fillDatabase() {
    this.http.get('assets/FilledDatabase.sql')
    .map(res => res.text())
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
      .then(data => {
        this.databaseReady.next(true);
        this.storage.set('database_filled', true);
      })
      .catch(e => console.log(e));
    });
  }






  addUser(UserId,FirstName,LastName,Street,Zip,City,Phone,Sex,Mail,Password,OptInNewsletter, UsualLoginLocations, PaymentMethod, PaymentData,Country) {
    let data = [UserId,FirstName,LastName,Street,Zip,City,Phone,Sex,Mail,Password,OptInNewsletter, UsualLoginLocations, PaymentMethod, PaymentData,Country];
    console.log('data being inserted: ', data);
    return this.database.executeSql("INSERT INTO User (UserId,FirstName,LastName,Street,Zip,City,Phone,Sex,Mail,Password,OptInNewsletter, UsualLoginLocations, PaymentMethod, PaymentData,Country) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?,?,?,?,?,?)", data).then(res => {
      return res;
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  getAllOrders() {
    return this.database.executeSql("SELECT * FROM Orders", []).then(data => {
      let orders = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          orders.push({OrderId: data.rows.item(i).OrderId, UserId: data.rows.item(i).UserId, Name: data.rows.item(i).Name})
        }
      }
      return orders;
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  getOrdersViewKitchen() {
    return this.database.executeSql("SELECT * FROM Orders WHERE OrderState='open'", []).then(data => {
      let orders = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          orders.push({OrderId: data.rows.item(i).OrderId, UserId: data.rows.item(i).UserId, Name: data.rows.item(i).Name})
        }
      }
      return orders;
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
