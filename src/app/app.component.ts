import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';
import { RegistrationPage } from '../pages/registration/registration';
import { UserStartPage } from '../pages/user-start/user-start';
import { OrderViewKitchenPage } from '../pages/order-view-kitchen/order-view-kitchen';
import { OrderViewServicePage } from '../pages/order-view-service/order-view-service';
import { OrderViewCustomerPage } from '../pages/order-view-customer/order-view-customer';
import { FaceRecognitionPage } from '../pages/face-recognition/face-recognition';
import { OrderCustomerPage } from '../pages/order-customer/order-customer';
import { UserViewPage } from '../pages/user-view/user-view';
import { AngularFireAuth } from 'angularfire2/auth';
import { LogoutPage } from '../pages/logout/logout';
import { ImprintPage } from '../pages/imprint/imprint';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { FurtherPagesPage } from '../pages/further-pages/further-pages';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { FirebaseService } from '../providers/firebase/firebase-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fire: AngularFireAuth, private FirebaseService: FirebaseService) {
    
    const unsubscribe = fire.auth.onAuthStateChanged(user => {
      if (!user) {
        this.nav.setRoot(StartPage);
        unsubscribe();
      } else {
        // then ist wichtig da erst der Wert gelesen worden sein muss
        this.FirebaseService.CurrentUserFirstName=this.FirebaseService.getCurrentUserFirstName(this.fire.auth.currentUser.uid).then(()=> {
          this.nav.setRoot(UserStartPage)
        });
        unsubscribe();
      }
    })
    this.initializeApp();
    //document.addEventListener("backbutton", this.onBackKeyDown, false);
    platform.registerBackButtonAction(() => {
      console.log("backPressed 1 aus app.component");
    },1);

    //test
    // used for an example of ngFor and navigation
    this.pages = [
      /*{ title: 'Login', component: StartPage },*/
      /*{ title: 'Registrierung', component: RegistrationPage },*/
      { title: 'QR-Scanner', component: UserStartPage },
      { title: 'Restaurant', component: RestaurantPage },
      { title: 'Speisekarte', component: OrderCustomerPage },
      { title: 'Bestellungen', component: OrderViewCustomerPage },
      { title: 'Küchenübersicht', component: OrderViewKitchenPage },
      { title: 'Serviceübersicht', component: OrderViewServicePage },
      /*{ title: 'Kontakt', component: ContactPage },*/
      { title: 'Benutzerprofil', component: UserViewPage },
      { title: 'Einstellungen', component: SettingsPage },
      { title: 'Weiteres', component: FurtherPagesPage },
      { title: 'Abmelden', component: LogoutPage }

      /*{ title: 'AGB', component: TermsAndConditionsPage },*/
      /*{ title: 'Datenschutz', component: PrivacyPolicyPage },*/
      /*{ title: 'Impressum', component: ImprintPage },*/

      /*{ title: 'Gesichtserkennung', component: FaceRecognitionPage },*/
    ];
  }

  onBackKeyDown() {
    // Handle the back button
    console.log("Back button override from app.component");
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
