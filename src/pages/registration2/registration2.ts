import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationFormPage } from '../registration-form/registration-form';
import { StartPage } from '../start/start';
import { User } from '../../models/order/user.model'
import { firebaseConfig } from '../../environment';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { UserStartPage } from '../user-start/user-start';
import { BasketPage } from '../basket/basket';


@Component({
  selector: 'page-registration2',
  templateUrl: 'registration2.html'
})

export class Registration2Page {
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
    Sex: 'undefined',
    Mail: this.fire.auth.currentUser.email,
    OptInNewsletter: 'undefined',
    BDay: undefined
  }



  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public FirebaseService: FirebaseService) {
    this.UserId = this.fire.auth.currentUser.uid;
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
