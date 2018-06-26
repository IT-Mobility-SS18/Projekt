import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';


/**
 * Generated class for the FaceRecognitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-face-recognition',
  templateUrl: 'face-recognition.html',
})
export class FaceRecognitionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public FirebaseService: FirebaseService) {
    this.FirebaseService.fillFaceData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceRecognitionPage');
  }

}