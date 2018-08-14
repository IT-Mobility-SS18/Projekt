import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { BasketPage } from '../pages/basket/basket';
import { ContactPage } from '../pages/contact/contact';
import { FaceRecognitionPage } from '../pages/face-recognition/face-recognition';
import { FurtherPagesPage } from '../pages/further-pages/further-pages';
import { ImprintPage } from '../pages/imprint/imprint';
import { LogoutPage } from '../pages/logout/logout';
import { OrderCustomerPage } from '../pages/order-customer/order-customer';
import { OrderViewKitchenPage } from '../pages/order-view-kitchen/order-view-kitchen';
import { OrderViewServicePage } from '../pages/order-view-service/order-view-service';
import { OrderViewCustomerPage } from '../pages/order-view-customer/order-view-customer';
import { PaymentPage } from '../pages/payment/payment';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { RegistrationPage } from '../pages/registration/registration';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { SettingsPage } from '../pages/settings/settings';
import { StartPage } from '../pages/start/start';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { UserStartPage } from '../pages/user-start/user-start';
import { UserViewPage } from '../pages/user-view/user-view';

import { BasketService } from '../providers/basket/basket-service';
import { FaceApiProvider } from '../providers/face-api/face-api';
import { FirebaseService } from '../providers/firebase/firebase-service';

import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { PayPal } from '@ionic-native/paypal';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';


@NgModule({
  declarations: [
    MyApp,
    BasketPage,
    ContactPage,
    FaceRecognitionPage,
    FurtherPagesPage,
    ImprintPage,
    LogoutPage,
    OrderCustomerPage,
    OrderViewCustomerPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    PaymentPage,
    PrivacyPolicyPage,
    RegistrationPage,
    RestaurantPage,
    SettingsPage,
    StartPage,
    TermsAndConditionsPage,
    UserStartPage,
    UserStartPage,
    UserViewPage
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot() 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BasketPage,
    ContactPage,
    FaceRecognitionPage,
    FurtherPagesPage,
    ImprintPage,
    LogoutPage,
    OrderCustomerPage,
    OrderViewCustomerPage,
    OrderViewKitchenPage,
    OrderViewServicePage,
    PaymentPage,
    PrivacyPolicyPage,
    RegistrationPage,
    RestaurantPage,
    SettingsPage,
    StartPage,
    TermsAndConditionsPage,
    UserStartPage,
    UserStartPage,
    UserViewPage
  ],
  providers: [
    BasketService,
    Camera,
    FaceApiProvider,
    FirebaseService,
    PayPal,
    QRScanner,
    SplashScreen,
    StatusBar,
    UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
