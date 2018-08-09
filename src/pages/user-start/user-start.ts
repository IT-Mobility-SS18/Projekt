import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides,MenuController, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { BasketPage } from '../basket/basket';
import { BasketService } from '../../providers/basket/basket-service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { OrderCustomerPage } from '../order-customer/order-customer';
import { OrderViewCustomerPage } from '../order-view-customer/order-view-customer';
import { UserViewPage } from '../user-view/user-view';

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
              public alertCtrl: AlertController,
            ) {
    this.username = fire.auth.currentUser.email;
    this.UserId = fire.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    this.alert('Scannen Sie bitte den QR-Code auf Ihrem Tisch im Restaurant.');
  }

  ionViewDidEnter() {
        this.menu.swipeEnable(false);
  }

  goToBasket() {
    this.navCtrl.setRoot(BasketPage, {});
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

    goToOrderViewCustomer(){
      this.navCtrl.push(OrderViewCustomerPage);
    }

    goToUserView(){
      this.navCtrl.push(UserViewPage);
    }

    //stoppe den qr code scann vorgang
  stop(){
    this.qrScanner.destroy();
  }

    // start qr scanner
  scanQRcode() {
    // Optionally request the permission early

    console.log('Hello qrcode scanner');
    this.qrScanner.prepare().then((status: QRScannerStatus) => {

    if (status.authorized) {
      console.log('authorized is true');
      // camera permission was granted
      // start scanning
      this.qrScanner.show();
      console.log('qrScanner.show');
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        var myData = <any>{};
        myData  = text;

        console.log(myData);
        console.log('result', myData['result']);


        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
        
        this.navCtrl.push(OrderCustomerPage, {});
        
        this.qrScanner.destroy(); // zerstör die kamera auch wieder ...
        //this.alert(myData);
        this.BasketService.QRRestaurantId = parseInt(myData.split(" ")[1]);  //Value of RestaurantId
        console.log("QR: RestaurantID: " +  myData.split(" ")[1]);
        this.BasketService.QRTischNr = parseInt(myData.split(" ")[3]); //Value of TischNr
        console.log("QR: TischNr: " +  myData.split(" ")[3]);
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
