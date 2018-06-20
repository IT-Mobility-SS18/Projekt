import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegistrationPage } from '../pages/registration/registration';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { OrderViewKitchenPage } from '../pages/orderViewKitchen/orderViewKitchen';
import { OrderViewServicePage } from '../pages/orderViewService/orderViewService';
import { OrderViewCustomerPage } from '../pages/orderViewCustomer/orderViewCustomer';
import { RegistrationFormPage } from '../pages/registration-form/registration-form';
import { LastOrderViewPage } from '../pages/lastOrderView/lastOrderView';

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
      { title: 'Start', component: StartPage },
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Registration', component: RegistrationPage },
      { title: 'Restaurant', component: RestaurantPage },
      { title: 'OrderViewKitchen', component: OrderViewKitchenPage },
      { title: 'OrderViewService', component: OrderViewServicePage },
      { title: 'OrderViewCustomer', component: OrderViewCustomerPage },
      { title: 'LastOrderView', component: LastOrderViewPage }
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
