import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../providers/firebase/firebase-service';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FurtherPagesPage } from '../pages/further-pages/further-pages';
import { LogoutPage } from '../pages/logout/logout';
import { OrderCustomerPage } from '../pages/order-customer/order-customer';
import { OrderViewCustomerPage } from '../pages/order-view-customer/order-view-customer';
import { OrderViewKitchenPage } from '../pages/order-view-kitchen/order-view-kitchen';
import { OrderViewServicePage } from '../pages/order-view-service/order-view-service';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { SettingsPage } from '../pages/settings/settings';
import { StartPage } from '../pages/start/start';
import { UserStartPage } from '../pages/user-start/user-start';
import { UserViewPage } from '../pages/user-view/user-view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fire: AngularFireAuth, private FirebaseService: FirebaseService) {
    // if user is logged in, redirection to userStart, else redirection to login
    const unsubscribe = fire.auth.onAuthStateChanged(user => {
      if (!user) {
        this.nav.setRoot(StartPage);
        unsubscribe();
      } else {
        // firstName has to be read so the root can be set -> sequential execution needs a then
        this.FirebaseService.CurrentUserFirstName=this.FirebaseService.getCurrentUserFirstName(this.fire.auth.currentUser.uid).then(()=> {
          this.nav.setRoot(UserStartPage)
        });
        unsubscribe();
      }
    })
    this.initializeApp();
    // hardware backbutton is overwritten and not usable
    platform.registerBackButtonAction(() => {
      console.log("backPressed 1 aus app.component");
    },1);

    // used for hamburger menu
    this.pages = [
      { title: 'QR-Scanner', component: UserStartPage },
      { title: 'Restaurant', component: RestaurantPage },
      { title: 'Speisekarte', component: OrderCustomerPage },
      { title: 'Bestellungen', component: OrderViewCustomerPage },
      { title: 'Küchenübersicht', component: OrderViewKitchenPage },
      { title: 'Serviceübersicht', component: OrderViewServicePage },
      { title: 'Benutzerprofil', component: UserViewPage },
      { title: 'Einstellungen', component: SettingsPage },
      { title: 'Weiteres', component: FurtherPagesPage },
      { title: 'Abmelden', component: LogoutPage }
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
