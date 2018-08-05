import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/order/user.model'
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { UserStartPage } from '../user-start/user-start';
import { BasketPage } from '../basket/basket';

//import { firebaseConfig } from '../../environment';
//import { ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular'; //Side-Menu löschen

@Component({
  selector: 'page-registration2',
  templateUrl: 'registration2.html'
})


export class Registration2Page {
  onChangeSex(SelectedValue){
    console.log("Selected Sex", SelectedValue);
  }

  onChangeOptInNewsletter(SelectedValue){
    console.log("Selected OptInNewsletter", SelectedValue);
  }

  UserId: string;
  UserMail: string;
  user: User = {
    FirstName: undefined,
    LastName: undefined,
    Street: undefined,
    ZipCode: undefined,
    City: undefined,
    Country: undefined,
    Phone: undefined,
    Sex: undefined,
    Mail: this.fire.auth.currentUser.email,
    OptInNewsletter: undefined,
    BDay: undefined
  }

  constructor(private menu: MenuController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public FirebaseService: FirebaseService) {
    this.UserId = this.fire.auth.currentUser.uid;
  }

  ionViewDidEnter() { //beim Öffnen der Seite Side-Menu wieder ausblenden
    this.menu.enable(false);
  }
    
  ionViewWillLeave() { //beim Verlassen der Seite Side-Menu wieder einblenden
    this.menu.enable(true);
  }

  cancelRegistration(){
    this.navCtrl.pop();
  }

  addUserDataToDatabase() {
    this.FirebaseService.addUser(this.user, this.UserId);
    this.navCtrl.setRoot(UserStartPage);

  }
  
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }
}
