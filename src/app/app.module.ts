import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { BasketPage } from '../pages/basket/basket';
import { HomePage } from '../pages/home/home';
import { PaymentPage } from '../pages/payment/payment';
import { RegistrationPage } from '../pages/registration/registration';
import { UserStartPage } from '../pages/user-start/user-start';
import { OrderViewKitchenPage } from '../pages/orderViewKitchen/orderViewKitchen';
import { OrderViewServicePage } from '../pages/orderViewService/orderViewService';
import { OrderViewCustomerPage } from '../pages/orderViewCustomer/orderViewCustomer';
import { RegistrationFormPage } from '../pages/registration-form/registration-form';
import { NewCustomerOrderPage } from '../pages/orderCustomer/orderCustomer';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from '../providers/firebase/firebase-service';
import { UserViewPage } from '../pages/userView/userView';
import { UserStartPage } from '../pages/user-start/user-start';



@NgModule({
  declarations: [
    MyApp,
    StartPage,
    BasketPage,
    HomePage,
    UserStartPage,
    PaymentPage,
    RegistrationPage,
    UserStartPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    OrderViewCustomerPage,
    RegistrationFormPage,
    NewCustomerOrderPage,
    UserViewPage
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
    UserStartPage,
    HomePage,
    PaymentPage,
    RegistrationPage,
    UserStartPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    OrderViewCustomerPage,
    RegistrationFormPage,
    NewCustomerOrderPage,
    UserViewPage
  ],
  providers: [
    PayPal,
    StatusBar,
    FirebaseService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
