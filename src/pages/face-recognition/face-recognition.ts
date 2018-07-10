import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { FaceApiProvider } from '../../providers/face-api/face-api';
import { BasketPage } from '../basket/basket';

//import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the FaceRecognitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-face-recognition',
  templateUrl: 'face-recognition.html',
})
export class FaceRecognitionPage {

  str_Ausgabe:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService, private faceapi:FaceApiProvider) {
    this.FirebaseService.fillFaceData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceRecognitionPage');
  }

  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

  createPersonGroup(){
    //this.faceapi.PersonGroupCreate();
    this.faceapi.PersonGroupCreate()
    .then((resultPersonGroupCreate)=> {
      console.log(JSON.stringify(resultPersonGroupCreate));
      this.str_Ausgabe=JSON.stringify(resultPersonGroupCreate);
    })
    .catch((err) => {
      console.log("Error@ Creation of Person Group" + err);
      this.str_Ausgabe = "Error@ Creation of Person Group" + err;
    });

  }

}
