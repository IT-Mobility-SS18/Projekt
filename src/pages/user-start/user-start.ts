import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController, AlertController, ToastController} from 'ionic-angular';

// import pages
import { BasketPage } from '../basket/basket';
import { OrderViewCustomerPage } from '../order-view-customer/order-view-customer';
import { RestaurantPage } from '../restaurant/restaurant';
import { UserViewPage } from '../user-view/user-view';

// import plugins
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

// import services
import { BasketService } from '../../providers/basket/basket-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Component({
  selector: 'page-user-start',
  templateUrl: 'user-start.html'
})

export class UserStartPage {
  public images: any;
  BasketStateColor = this.BasketService.BasketStateColor;
  @ViewChild('slider') slider: Slides;
  page = 0;

  // username: string;
  // UserId: string;
  CurrentFirstName:string;

  constructor(private fire: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              private BasketService: BasketService,
              private qrScanner: QRScanner,
              private menu: MenuController,
              public alertCtrl: AlertController,
              public FirebaseService: FirebaseService,
              private toastCtrl: ToastController
            ) {
    //this.UserId = fire.auth.currentUser.uid;
  }

  ionViewWillEnter() {
    /*this.alert('Scannen Sie bitte den QR-Code auf Ihrem Tisch im Restaurant.');*/
    setTimeout(() => {
    this.scanQRcode();
  }, 1);
  }

  ngOnInit() {
    //this.CurrentFirstName = this.FirebaseService.CurrentUserFirstName;

  }

  ionViewCanLeave() {
    this.stop();
  }

  // refresh basket state color
  ionViewDidEnter() {
        this.menu.swipeEnable(false);
        this.BasketStateColor = this.BasketService.BasketStateColor;
  }

  ionViewCanEnter() {
    this.CurrentFirstName = this.FirebaseService.CurrentUserFirstName;
  }

  goToBasket() {
    this.navCtrl.push(BasketPage, {});
  }

  // not in use at the moment
  selectedTab(index) {
    this.slider.slideTo(index);
  }



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

  // create toast
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Es gab ein Problem mit dem QR-Code!',
      duration: 4000,
      position: 'bottom',
      cssClass: 'toast-container'
    });
    toast.present();
  }

    // start qr scanner
  scanQRcode() {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {

    if (status.authorized) {
      // camera permission was granted
      // start scanning
      this.qrScanner.show();
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        var myData = <any>{};
        myData  = text;
        this.BasketService.removeAll();
        this.BasketService.checkBasketContent();
        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning

        this.navCtrl.setRoot(RestaurantPage);
        this.BasketService.QRRestaurantId = parseInt(myData.split(" ")[1]);  //Value of RestaurantId
        this.BasketService.QRTischNr = parseInt(myData.split(" ")[3]); //Value of TischNr
        if(myData == undefined || !this.BasketService.QRRestaurantId || !this.BasketService.QRTischNr) {
          //this.alert("Es gab ein Problem mit dem QR-Code!");
          this.presentToast();
          this.navCtrl.setRoot(UserStartPage);
        }
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
