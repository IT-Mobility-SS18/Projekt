import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';
import { RegistrationPage } from '../pages/registration/registration';
import { UserStartPage } from '../pages/user-start/user-start';
import { OrderViewKitchenPage } from '../pages/orderViewKitchen/orderViewKitchen';
import { OrderViewServicePage } from '../pages/orderViewService/orderViewService';
import { OrderViewCustomerPage } from '../pages/order-view-customer/order-view-customer';
import { RegistrationFormPage } from '../pages/registration-form/registration-form';
import { FaceRecognitionPage } from '../pages/face-recognition/face-recognition';
import { OrderCustomerPage } from '../pages/order-customer/order-customer';
import { UserViewPage } from '../pages/userView/userView';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: StartPage },
      { title: 'Registrierung', component: RegistrationPage },
      { title: 'Startseite', component: UserStartPage },
      { title: 'Bestellen', component: OrderCustomerPage },
      { title: 'Bestellungen', component: OrderViewCustomerPage },
      { title: 'Bestellübersicht Küche', component: OrderViewKitchenPage },
      { title: 'Bestellübersicht Service', component: OrderViewServicePage },
      { title: 'RegistrationForm', component: RegistrationFormPage },
      { title: 'FaceRecognition', component: FaceRecognitionPage },
      { title: 'Benutzerprofil', component: UserViewPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
