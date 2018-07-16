import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides,MenuController, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

//import { IonicPage } from 'ionic-angular';

@Component({
  selector: 'page-user-start',
  templateUrl: 'user-start.html'
})

export class UserStartPage {
  public images: any;
  BasketStateColor = this.BasketService.BasketStateColor;
  @ViewChild('slider') slider: Slides;
  page = 0;
  constructor(private fire: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              private BasketService: BasketService,
              private qrScanner: QRScanner,
              private menu: MenuController,
              public alertCtrl: AlertController) {
    this.username = fire.auth.currentUser.email;
    this.UserId = fire.auth.currentUser.uid;
  }

  ionViewDidEnter() {
        this.menu.swipeEnable(false);
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  // not in use at the moment
  selectedTab(index) {
    this.slider.slideTo(index);
  }

  username: string;
  UserId: string;

  // not in use at the moment
  alert(message: string) {
        this.alertCtrl.create({
            title: 'Information',
            subTitle: message,
            buttons: ['Okay']
        }).present();
    }
 
    // start qr scanner
  start() {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {

    if (status.authorized) {
      // camera permission was granted
      // start scanning
      this.qrScanner.show();
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        var myData = <any>{};
        myData  = text;

        console.log(myData);
        console.log('result', myData['result']);


        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
        this.alert(myData);
      });

 
    } else if (status.denied) {
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
    } else {
      // permission was denied, but not permanently. You can ask for permission again at a later time.
    }

  })
  .catch((e: any) => {
    console.log('Error is', e);
      this.alert(e.message);
  });


  }


}
