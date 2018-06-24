import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { BasketPage } from '../pages/basket/basket';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PaymentPage } from '../pages/payment/payment';
import { RegistrationPage } from '../pages/registration/registration';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { OrderViewKitchenPage } from '../pages/orderViewKitchen/orderViewKitchen';
import { OrderViewServicePage } from '../pages/orderViewService/orderViewService';
import { OrderViewCustomerPage } from '../pages/orderViewCustomer/orderViewCustomer';
import { RegistrationFormPage } from '../pages/registration-form/registration-form';
import { LastOrderViewPage } from '../pages/lastOrderView/lastOrderView';
import { NewCustomerOrderPage } from '../pages/new-customer-order/new-customer-order';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from '../providers/firebase/firebase-service';


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    BasketPage,
    HomePage,
    ListPage,
    PaymentPage,
    RegistrationPage,
    RestaurantPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    OrderViewCustomerPage,
    RegistrationFormPage,
    LastOrderViewPage,
    NewCustomerOrderPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    BasketPage,
    HomePage,
    ListPage,
    PaymentPage,
    RegistrationPage,
    RestaurantPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    OrderViewCustomerPage,
    RegistrationFormPage,
    LastOrderViewPage,
    NewCustomerOrderPage
  ],
  providers: [
    PayPal,
    StatusBar,
    SQLite,
    DatabaseProvider,
    FirebaseService,
    SplashScreen,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
