import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { FaceApiProvider } from '../../providers/face-api/face-api';
import { BasketPage } from '../basket/basket';

// Für Camera Bilder und upload in Firebase
//import firebase from "firebase";
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PaymentPage } from '../payment/payment';
// import { Platform, ActionSheetController } from 'ionic-angular';

//aaron
import { ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
// import { Device } from 'ionic-native';
import * as firebase from 'firebase';
declare var window: any;
//import { normalizeURL } from 'ionic-angular';
//import {DomSanitizer} from '@angular/platform-browser';


//import { IonicPage } from 'ionic-angular';

@Component({
  selector: 'page-face-recognition',
  templateUrl: 'face-recognition.html',
})
export class FaceRecognitionPage {

  public str_Ausgabe:string;
  public img_url:string;

  public groupName:string;
  public personGroupId:string;

  public personId:string;
  public faceId:string;
  public persistedFaceId:string;

  public UserCreationRef:any;
  public testuserid:string;
  public testuserid_faceapi:string;
  public username:string;

  public verify_isIdentical:boolean;
  public verify_confidence:number;


  PicStorage = firebase.storage();
  PicReference = this.PicStorage.ref();
  ImagesRef = this.PicReference.child('UserPictures');

  //für bilder
  public base64Image:any;
  public base64Image_mit_attrib:any;
  public base64Image_Blob:any;

  public latest_picture_name:any;

  public UserPictures_IMGRef1:any;
  public UserPictures_IMGRef2:any;
  public UserPictures_IMGRef3:any;


  //für payment durchgeschliffen
  amount: string;

  //Wächter für firebase upload
  currentImage:any;
  onSuccess = snapshot => {
    this.currentImage = snapshot.downloadURL;
    //this.loading.dismiss();
  };
  onError = error => {
    console.log("error", error);
    //this.loading.dismiss();
  };


  // UserPictures_IMGRef1 = this.ImagesRef.child(this.testuserid).child('Family1-Dad1.jpg').getDownloadURL();
  // UserPictures_IMGRef2 = this.ImagesRef.child(this.testuserid).child('Family1-Dad2.jpg').getDownloadURL();
  // UserPictures_IMGRef3 = this.ImagesRef.child(this.testuserid).child('Family1-Dad3.jpg').getDownloadURL();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public FirebaseService: FirebaseService,
    public faceapi:FaceApiProvider,
    public camera: Camera,
    public domSanitizer:DomSanitizer,
    public alertCtrl: AlertController,

    public platform: Platform,
    private http: Http,
    private zone: NgZone

    ) {

    //amount durchgeschliffen für payment
    this.amount = navParams.get('amount');

    this.alertCtrl = alertCtrl;

    // für debug test
    // this.testuserid='02mMPGAy5DebIM7fs9OEZSkwlGx1'; //vergeben von firebase bei Registrierung
    // this.testuserid_faceapi=(this.testuserid.toLowerCase())+'005'; // faceapi kann nur kleinbuchstaben
    // this.groupName='OptionalerGruppenName';
    // this.personGroupId='group_from_user'+this.testuserid_faceapi; // selbst generierte personGroupId
    // this.username='OptionalerUserName';
    // this.personId='994bbcb2-7ea3-4cf1-bf46-d2e1c5b732d2';

    // für MARA Test
    this.testuserid='bkQCX0IUqIUgkteYDphIi475Ypu1'; //vergeben von firebase bei Registrierung
    this.testuserid_faceapi=(this.testuserid.toLowerCase());
    // Schritt 1: registrierung der gruppe und der person in faceapi und firebase
    this.personGroupId='group_from_user'+this.testuserid_faceapi;
    this.groupName='OptionaleGruppenInfromationen';
    this.username='OptionaleUserInformationen';
    //Person id wird von faceApi erzeugt, zum Testen wirde diese aber eingepflegt
    this.personId= '6101bbf8-eb3e-4dc1-9027-ba61d87430f4';

    // Schritt 2: Selfie aufnehmen um ein Gesicht zur FaceApi zuzuordnen
    // es wir






    // this.UserPictures_IMGRef1 = this.ImagesRef.child(this.testuserid).child('Family1-Dad1.jpg').getDownloadURL();
    // this.UserPictures_IMGRef2 = this.ImagesRef.child(this.testuserid).child('Family1-Dad2.jpg').getDownloadURL();
    // this.UserPictures_IMGRef3 = this.ImagesRef.child(this.testuserid).child('Family1-Dad3.jpg').getDownloadURL();


    //this.FirebaseService.fillFaceData();

  }

<<<<<<< HEAD
  // *******************************************************
  // allg. Funktionen zum Start der Seite
  // *******************************************************

=======
  // After loading the page
>>>>>>> b737ef121e40d1eb945d7a486cd7b438e7260313
  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceRecognitionPage');
  }

  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

  // *******************************************************
  // Funktionen zum Darstellen der Camera Bilder
  // *******************************************************

  getImgContent1(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(this.base64Image);
  }
  getImgContent2(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(this.base64Image_mit_attrib);
  }

  // *******************************************************
  // Funktionen zum Ansprechen der Camera
  // und upload zur firebase
  // *******************************************************

  takeapicture(){
    console.log("Hello function takeapicture");
    const options: CameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      // !!! für firebase ist destinationType DATA_URL zwingend
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 640,
      correctOrientation: true
    }

    this.camera.getPicture(options)
    .then((imageData) => {
       this.base64Image_mit_attrib = 'data:image/jpeg;base64,' + imageData;

       this.base64Image = imageData;
       console.log('this.base64Image: ');
       console.log(this.base64Image);

       this.base64Image_Blob  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

       this.upload();

       console.log('YEAAHHH endlich hochgeladen :D');
    });
  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  upload() {
    if (this.base64Image_Blob) {
      this.latest_picture_name = this.personId + '_'+ new Date().getTime() + '.png';

      // this.ImagesRef.child(this.testuserid).child('Family1-Dad3.jpg')

      //var uploadTask = firebase.storage().ref().child('UserPictures/'+this.latest_picture_name).put(this.base64Image_Blob);
      var uploadTask = firebase.storage().ref().child('UserPictures/').child(this.testuserid).child(this.latest_picture_name).put(this.base64Image_Blob);
      uploadTask.then(this.onSuccess, this.onError);
    }
  }


// *******************************************************
// face api
// *******************************************************


  verify_me(){
    // Schritt 4:   Bild machen, in fb und addFace hochladen und trainieren
    // Schritt 4.1: firebase url generieren
    // Schritt 4.2: Face detection, um faceId zu erzeugen
    // Schritt 4.3: Aufruf Verifikation mit faceID, personId und personId

    console.log("Hello function verify_me");

    // Schritt 4.1: firebase url generieren
    //var pictureName='P1122450.jpg';
    var pictureName=this.latest_picture_name;

    this.getUrlfromFirebaseUserPictures(pictureName)
    .then(resultgetUrlfromFirebaseUserPictures=>{
      if(resultgetUrlfromFirebaseUserPictures){
        console.log('resultgetUrlfromFirebaseUserPictures: '+resultgetUrlfromFirebaseUserPictures);

        // Schritt 4.2: Face detection, um faceId zu erzeugen
        this.faceapi.FaceIdFromFaceDetect(this.img_url)
        .then(resultFaceIdFromFaceDetect=>{
          console.log('resultFaceIdFromFaceDetect: '+ JSON.stringify(resultFaceIdFromFaceDetect));
          //this.faceId=JSON.stringify(resultFaceIdFromFaceDetect[0]['faceId']);
          this.faceId=(resultFaceIdFromFaceDetect[0]['faceId']);
          console.log(this.faceId);

          //Schritt 4.3: Aufruf Verifikation mit faceID, personId und personId
          // "isIdentical": true,
          // "confidence": 0.9
          this.faceapi.VerificationFromVerify(this.faceId, this.personId, this.personGroupId)
          .then(resultVerificationFromVerify=>{
            console.log('resultVerificationFromVerify: '+ JSON.stringify(resultVerificationFromVerify));
            // console.log('isIdentical'+JSON.stringify(resultVerificationFromVerify[0]['isIdentical']));
            // console.log('confidence'+JSON.stringify(resultVerificationFromVerify[0]['confidence']));

            // Decomposing bzw. Destructuring von unbekannten Objekten (property) in ein array
            const getValue = (key, feed) => {
              const {
                [key]: value
              } = feed;

              return value;
            }
            const output = Object.keys(resultVerificationFromVerify).map(key => getValue(key, resultVerificationFromVerify));
            // end decomposing

            this.verify_isIdentical=output[0];
            this.verify_confidence=output[1];
            console.log('this.isIdentical: '+this.verify_isIdentical);
            console.log('this.verify_confidence: '+this.verify_confidence);


            // wenn beides gut, dann weiterleiten an payment
            if (this.verify_isIdentical==true && this.verify_confidence>=0.6){
              console.log('push to payment');
              this.navCtrl.push(PaymentPage, {amount: this.amount});
            } else {
              console.log('kein push to payment, da nicht identisch oder confidence zu gering');
            }

          });//end resultVerificationFromVerify
        });//end resultFaceIdFromFaceDetect

      } else {
        console.log('Error@ verify_me resultgetUrlfromFirebaseUserPictures');
      }
    });//end resultgetUrlfromFirebaseUserPictures
  }

  getUrlfromFirebaseUserPictures(pictureName:string){
    console.log("Hello function getUrlfromFirebaseUserPictures");
    console.log(pictureName);
    return new Promise((resolve, reject)=>{

      // hier muss der richtige pfda hin

      // PicStorage = firebase.storage();
      // PicReference = this.PicStorage.ref();
      // ImagesRef = this.PicReference.child('UserPictures');
      //org: this.ImagesRef.child(this.testuserid).child(pictureName).getDownloadURL()
      //new this.img_url=this.firebase.storage().ref().child('UserPictures/').child(this.testuserid).child(pictureName).getDownloadURL()


      this.ImagesRef.child(this.testuserid).child(pictureName).getDownloadURL()
      .then(result=>{
        console.log('getUrlfromFirebaseUserPictures: '+ result);
        this.img_url=result;
        resolve(true);
      }, err=>{
        console.log('Error@ getUrlfromFirebaseUserPictures'+ err);
        reject(err);
      });//end result
    });//end promise
  }

  testfunktion_addingface(){
    // this.addingface('Family1-Dad1.jpg');
    // this.addingface('Family1-Dad2.jpg');

    // Mara test
    // bin inkl IMG_5193.jpg
    this.addingface('IMG_5193.jpg');

  }

  addingface(pictureName:string){

    console.log("Hello function addingface");

    // Schritt 3:   Bild machen
    // Schritt 3.1: Bild in firebase hochladen
    // Schritt 3.2: link zu firebase Bild generieren
    // Schritt 3.3: addFace to faceApi
    // Schritt 3.4: Machine learning - Maschine trainieren
    //----------------------------------------------

    // Schritt 3.2: link zu firebase Bild generieren
    //var pictureName='Family1-Dad1.jpg';
    this.getUrlfromFirebaseUserPictures(pictureName)
    .then(resultgetUrlfromFirebaseUserPictures=>{
      if(resultgetUrlfromFirebaseUserPictures){
        console.log('resultgetUrlfromFirebaseUserPictures: '+resultgetUrlfromFirebaseUserPictures);

        // Schritt 3.3: addFace in faceApi
        this.addingfacetofaceApi(this.personGroupId,this.personId, this.img_url)
        .then(resultaddingfacetofaceApi=>{
          console.log('resultaddingfacetofaceApi: '+resultaddingfacetofaceApi);
          this.persistedFaceId=JSON.stringify(resultaddingfacetofaceApi);

          // Schritt 3.4: Machine learning - Maschine trainieren
          this.faceapi.TrainTheMachine(this.personGroupId);

        });//end resultCreatePersonGroupPerson

      } else {
        console.log('Error@ resultgetUrlfromFirebaseUserPictures: '+resultgetUrlfromFirebaseUserPictures);
      }
    });//end resultgetUrlfromFirebaseUserPictures
  }

  addingfacetofaceApi(personGroupId:string, personId:string, picture_url:string){
    // Schritt 3.3: addFace in faceApi
    // Rückgabe: persistedFaceId

    console.log("Hello function addingfacetofaceApi");

    return new Promise((resolve, reject)=>{
      this.faceapi.PersonGroupPersonAddFace(personGroupId,personId,picture_url)
      .then((result)=> {
          console.log(JSON.stringify('Adding Face 2 Person successful'));
          console.log(result);

          // Decomposing bzw. Destructuring von unbekannten Objekten (property) in ein array
          const getValue = (key, feed) => {
            const {
              [key]: value
            } = feed;

            return value;
          }
          const output = Object.keys(result).map(key => getValue(key, result));
          // end decomposing

          resolve(output.toString());
          //resolve(result);
      })
      .catch((err) => {
        console.log("Error@ Adding Face 2 Person: " + err);
        reject(err);
      }); //end result
    });//end promise



  }

  // *******************************************************
  // face api
  // Funktionen für Schritt 1 Gruppe und Person anlegen
  // *******************************************************

  GroupAndPersonfaceApiandFirebase(){
    // Schritte bisher implementiert:
    // Schritt 1:   Gruppe in FaceApi anlegen
    // Schritt 1.1: Gruppe in Firebase anlegen
    // Schritt 2:   Person in FaceApi anlegen und personId anfordern
    // Schritt 2.1: erzeugte personId in firebase ablegen

    // Schritt 3:   Bild machen
    // Schritt 3.1: Bild in firebase hochladen und link zu firebase generieren
    // Schritt 3.2: addFace in faceApi

    //zum Testen:
    //GroupId: group_from_user02mmpgay5debim7fs9oezskwlgx1005
    //personId: 994bbcb2-7ea3-4cf1-bf46-d2e1c5b732d2

    // Schritt 1: Gruppe in FaceApi anlegen
    this.createPersonGroup()
      .then (resultPersonGroupCreate=> {
        if (resultPersonGroupCreate){
            console.log('resultPersonGroupCreate: '+resultPersonGroupCreate);
            // Schritt 1.1: Gruppe in Firebase anlegen
            this.FirebasePersonGroupCreate()
            .then(resultFirebasePersonGroupCreate=>{
              if(resultFirebasePersonGroupCreate){
                console.log('resultFirebasePersonGroupCreate: '+resultFirebasePersonGroupCreate);
              } else {
                console.log('Error@ GroupAndPersonfaceApiandFirebase resultFirebasePersonGroupCreate');
              }
            });//end resultFirebasePersonGroupCreate

            // Gruppe ist überall angelegt
            // nun Schritt 2: Person in FaceApi anlegen und personId anfordern
            this.CreatePersonGroupPerson(this.personGroupId,this.username)
            .then(resultCreatePersonGroupPerson=>{
              if(resultCreatePersonGroupPerson){
                console.log('resultCreatePersonGroupPerson personId: '+resultCreatePersonGroupPerson);
                this.personId=JSON.stringify(resultCreatePersonGroupPerson);

                //Schritt 2.1 eben erzeugte personId in firebase ablegen
                this.FirebasePersonIdCreate(this.personId)
                .then(resultFirebasePersonIdCreate=>{
                  if(resultFirebasePersonIdCreate){
                    console.log('resultFirebasePersonIdCreate: '+resultFirebasePersonIdCreate);

                  } else {
                    console.log('Error@ GroupAndPersonfaceApiandFirebase resultFirebasePersonIdCreate');
                  }
                });//end resultFirebasePersonIdCreate


              //gehört zu: if(resultCreatePersonGroupPerson){
              } else {
                console.log('Error@ GroupAndPersonfaceApiandFirebase resultCreatePersonGroupPerson');
              }
            });//end resultCreatePersonGroupPerson

        //gehört zu: if (resultPersonGroupCreate){
        } else {
          console.log('Error@ GroupAndPersonfaceApiandFirebase resultPersonGroupCreate');
        }
      });//end resultPersonGroupCreate
  }//end GroupAndPersonfaceApiandFirebase

  FirebasePersonIdCreate(personGroupId:string){
    // Schritt 2.1 - personId in firebase speichern
    console.log("Hello function FirebasePersonIdCreate");
    return new Promise((resolve, reject)=>{
      this.UserCreationRef =firebase.database().ref('/User')
      .child(this.testuserid).child('FaceRecognition').child(this.personGroupId)
      .child(this.personId).set({'FacePersonId':this.personId})
      .then(result=>{
        console.log('FirebasePersonGroupCreate'+ result);
        resolve(true);
      }, err=>{
        console.log('Error@ FirebasePersonGroupCreate'+ err);
        reject(err);
      });//end result
    });//end promise

  }

  CreatePersonGroupPerson(personGroupId:string, username:string){
    // Schritt 2. - Person in FaceApi anlegen
    // Rückgabe: personId
    return new Promise((resolve, reject)=>{
      this.faceapi.PersonGroupPersonCreate(personGroupId,username)
      .then((result)=> {
          console.log(JSON.stringify('Creation of Person successful'));
          console.log(result);

          // Decomposing bzw. Destructuring von unbekannten Objekten (property) in ein array
          const getValue = (key, feed) => {
            const {
              [key]: value
            } = feed;

            return value;
          }
          const output = Object.keys(result).map(key => getValue(key, result));
          // end decomposing

          //this.personId=output.toString();
          //console.log(this.personId);
          resolve(output.toString());
      })
      .catch((err) => {
        console.log("Error@ Creation of Person: " + err);
        reject(err);
      }); //end resultPersonGroupCreate
    });//end promise
  }

  createPersonGroup() {
    // Schritt 1. - Personen Gruppe in FaceApi anlegen
    // Rückgabe: null
    return new Promise((resolve, reject)=>{
      this.faceapi.PersonGroupCreate(this.groupName,this.personGroupId)
      .then((resultPersonGroupCreate)=> {
          console.log(JSON.stringify('Creation of Group successful: '+resultPersonGroupCreate));
          console.log(JSON.stringify('personGroupId: '+this.personGroupId));
          resolve(true);
      })
      .catch((err) => {
        console.log("Error@ Creation of Person Group: " + err);
        reject(err);
      }); //end resultPersonGroupCreate
    });//end promise
  }

  FirebasePersonGroupCreate() {
    // Schritt 1.1 - Personen Gruppe in Firebase anlegen
    console.log("Hello function PersonGroupCreate");
    return new Promise((resolve, reject)=>{
      this.UserCreationRef =firebase.database().ref('/User')
      .child(this.testuserid).child('FaceRecognition')
      .child(this.personGroupId).set({'FaceGroupId':this.personGroupId})
      .then(result=>{
        console.log('FirebasePersonGroupCreate'+ result);
        resolve(true);
      }, err=>{
        console.log('Error@ FirebasePersonGroupCreate'+ err);
        reject(err);
      });//end result
    });//end promise
  }

}
