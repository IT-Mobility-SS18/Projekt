import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PaymentPage } from '../pages/payment/payment';
import { RegistrationPage } from '../pages/registration/registration';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { OrderViewKitchenPage } from '../pages/orderViewKitchen/orderViewKitchen';
import { OrderViewServicePage } from '../pages/orderViewService/orderViewService';


import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    ListPage,
    PaymentPage,
    RegistrationPage,
    RestaurantPage,
    OrderViewKitchenPage,
    OrderViewServicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HomePage,
    ListPage,
    PaymentPage,
    RegistrationPage,
    RestaurantPage,
    OrderViewKitchenPage,
    OrderViewServicePage
  ],
  providers: [
    PayPal,
    StatusBar,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
