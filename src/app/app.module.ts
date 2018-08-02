import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { BasketPage } from '../pages/basket/basket';
import { PaymentPage } from '../pages/payment/payment';
import { Registration2Page } from '../pages/registration2/registration2';
import { RegistrationPage } from '../pages/registration/registration';
import { UserStartPage } from '../pages/user-start/user-start';
import { OrderViewKitchenPage } from '../pages/order-view-kitchen/order-view-kitchen';
import { OrderViewServicePage } from '../pages/order-view-service/order-view-service';
import { OrderViewCustomerPage } from '../pages/order-view-customer/order-view-customer';
import { FaceRecognitionPage } from '../pages/face-recognition/face-recognition';
import { UserViewPage } from '../pages/user-view/user-view';
import { OrderCustomerPage } from '../pages/order-customer/order-customer';

import { PayPal } from '@ionic-native/paypal'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from '../providers/firebase/firebase-service';
import { BasketService } from '../providers/basket/basket-service';

//for face api
import { FaceApiProvider } from '../providers/face-api/face-api';
import { HttpClientModule,} from '@angular/common/http';
// end face api

import { Camera } from '@ionic-native/camera'; /* QR-Code und face api*/
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner'; /* QR-Code */
import { LogoutPage } from '../pages/logout/logout';




@NgModule({
  declarations: [
    MyApp,
    StartPage,
    BasketPage,
    LogoutPage,
    UserStartPage,
    PaymentPage,
    Registration2Page,
    RegistrationPage,
    UserStartPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    OrderViewCustomerPage,
    FaceRecognitionPage,
    OrderCustomerPage,
    UserViewPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    BasketPage,
    LogoutPage,
    UserStartPage,
    PaymentPage,
    Registration2Page,
    UserStartPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    OrderViewCustomerPage,
    FaceRecognitionPage,
    OrderCustomerPage,
    UserViewPage,
    RegistrationPage,
  ],
  providers: [
    PayPal,
    StatusBar,
    FirebaseService,
    BasketService,
    SplashScreen,
    Camera, /* QR-Code und face api*/
    QRScanner, /* QR-Code */
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //{provide: Camera, useClass: CameraMock},
    FaceApiProvider
  ]
})
export class AppModule {}
