import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'data.db'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private db: SQLiteObject;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.createDbFile();
  }

private createDbFile(): void {
  this.sqlite.create({
  name: DATABASE_FILE_NAME,
  location: 'default'
})
  .then((db: SQLiteObject) => {
    console.log('Database '+ DATABASE_FILE_NAME + ' created');
    this.db = db;
    this.createTables();
  })
  .catch(e => console.log(e));
}

private createTables(): void {
  this.db.executeSql('CREATE TABLE IF NOT EXISTS `User` ( `UserId` INTEGER NOT NULL UNIQUE, `FirstName` TEXT, `LastName` TEXT, `Street` TEXT, `Zip` INTEGER, `City` TEXT, `Phone` INTEGER, `Sex` TEXT, `Mail` TEXT, `Password` TEXT, `OptInNewsletter` INTEGER, `UsualLoginLocations` TEXT, PRIMARY KEY(`UserId`) )', {})
     .then(() => {
       console.log('Table User created')

       this.db.executeSql('CREATE TABLE IF NOT EXISTS `PaymentData` ( `UserId` INTEGER NOT NULL, `Country` TEXT, `Bic` TEXT, `Iban` TEXT, PRIMARY KEY(`UserId`) )', {})
      .then(() => console.log('Table PaymentData created'))
      .catch(e => console.log(e));

      this.db.executeSql('CREATE TABLE IF NOT EXISTS `Items` ( `ItemId` INTEGER NOT NULL, `RestaurantId` INTEGER NOT NULL, `Category` TEXT, `Picture` TEXT, `Name` TEXT, `Price` NUMERIC, `Description` TEXT, `Size` TEXT, `Variants` TEXT, `Ingredients` TEXT, PRIMARY KEY(`ItemId`,`RestaurantId`) )', {})
     .then(() => console.log('Table Items created'))
     .catch(e => console.log(e));

     this.db.executeSql('CREATE TABLE IF NOT EXISTS `KitchenUser` ( `KitchenUserId` INTEGER NOT NULL, `Name` TEXT, `Password` TEXT, PRIMARY KEY(`KitchenUserId`) )', {})
    .then(() => console.log('Table KitchenUser created'))
    .catch(e => console.log(e));

    this.db.executeSql('CREATE TABLE IF NOT EXISTS `ManagementUser` ( `ManagementUserId` INTEGER NOT NULL, `Name` TEXT, `Password` TEXT, PRIMARY KEY(`ManagementUserId`) )', {})
   .then(() => console.log('Table ManagementUser created'))
   .catch(e => console.log(e));

   this.db.executeSql('CREATE TABLE IF NOT EXISTS `Orders` ( `OrderId` INTEGER NOT NULL, `Name` TEXT, `Price` NUMERIC, `Quantity` INTEGER, `Picture` TEXT, `DeliveryCosts` NUMERIC, `OrderState` TEXT, `TimeStamp` TEXT, `NameOfRestaurant` TEXT, `PayStatus` TEXT, `Annotations` TEXT, PRIMARY KEY(`OrderId`) )', {})
  .then(() => console.log('Table Orders created'))
  .catch(e => console.log(e));

  this.db.executeSql('CREATE TABLE IF NOT EXISTS `Restaurants` ( `RestaurantId` INTEGER NOT NULL, `Name` TEXT, `OpeningTimes` TEXT, `Location` TEXT, PRIMARY KEY(`RestaurantId`) )', {})
 .then(() => console.log('Table Restaurants created'))
 .catch(e => console.log(e));

 this.db.executeSql('CREATE TABLE IF NOT EXISTS `ServiceUser` ( `ServiceUserId` INTEGER NOT NULL, `Name` TEXT, `Password` TEXT )', {})
.then(() => console.log('Table ServiceUser created'))
.catch(e => console.log(e));

this.db.executeSql('CREATE TABLE IF NOT EXISTS `UserFavorites` ( `UserId` INTEGER NOT NULL, `RestaurantName` TEXT NOT NULL, `Rating` INTEGER, PRIMARY KEY(`UserId`) )', {})
.then(() => console.log('Table UserFavorites created'))
.catch(e => console.log(e));

     })
     .catch(e => console.log(e));
}

}
