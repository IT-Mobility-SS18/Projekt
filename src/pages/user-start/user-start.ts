import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Slides} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';



@Component({
  selector: 'page-user-start',
  templateUrl: 'user-start.html'
})

export class UserStartPage {
  public images: any;
  BasketStateColor = this.BasketService.BasketStateColor;
  @ViewChild('slider') slider: Slides;
  page = 0;
  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private BasketService: BasketService, private qrScanner: QRScanner) {
    this.username = fire.auth.currentUser.email;
    this.UserId = fire.auth.currentUser.uid;
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }
  username: string;
  UserId: string;

  start() {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
    if (status.authorized) {
      // camera permission was granted
 
 
      // start scanning
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        console.log('Scanned something', text);
 
        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
      });
 
    } else if (status.denied) {
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
    } else {
      // permission was denied, but not permanently. You can ask for permission again at a later time.
    }
  })
  .catch((e: any) => console.log('Error is', e));
}
  
}
