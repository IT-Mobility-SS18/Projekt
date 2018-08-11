import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { FaceApiProvider } from '../../providers/face-api/face-api';
import { BasketPage } from '../basket/basket';
import { AngularFireAuth } from 'angularfire2/auth';

// Für Camera Bilder und upload in Firebase
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PaymentPage } from '../payment/payment';
import * as firebase from 'firebase';
//import firebase from "firebase";

import { Events } from 'ionic-angular';
import { UserViewPage } from '../user-view/user-view';
import { UserStartPage } from '../user-start/user-start';


@Component({
  selector: 'page-face-recognition',
  templateUrl: 'face-recognition.html',
})
export class FaceRecognitionPage {

  // für personen und gruppen anlage
  public userId:string;
  public userId_faceapi:string;
  public personGroupId:string;
  public groupName:string;
  public userName:string;
  public personId:string;       // wird von faceApi erzeugt
  public UserCreationRef:any;   // Person in firebase referenz

  // für Bild
  public base64Image_Blob:any;        // image blob global wegen speicherschonung
  public base64Image_mit_attrib:any;  // Frü Anzeige auf App-Seite
  public pictureName:any;             // Bilddateiname, global wegen sharing aufruf, Name wird zufällig generiert
  public PicStorage = firebase.storage();
  public PicReference = this.PicStorage.ref();
  public ImagesRef = this.PicReference.child('UserPictures');
  public img_url:string;              // URL des bildes von firebase, wird ermittelt

  // für verify
  public faceId:string;               // faceID wird von FaceApi erzeugt
  public persistedFaceId:string;      // wird von faceApi erzeugt
  public verify_isIdentical:boolean;
  public verify_confidence:number;
  public verify_me_delivered_isidentical:boolean; // Steuerung der adding face

  public loading:any;



  // für tests
  // public str_Ausgabe:string;
  // public persistedFaceId:string;
  //
  // public base64Image:any;
  // public base64Image_mit_attrib:any;
  // public latest_picture_name:any;
  // public UserPictures_IMGRef1:any;
  // public UserPictures_IMGRef2:any;
  // public UserPictures_IMGRef3:any;


  //für payment durchgeschliffen
  public amount: string;

  //registration
  public registration: boolean;


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public FirebaseService: FirebaseService,
    public faceapi:FaceApiProvider,
    public camera: Camera,
    public domSanitizer:DomSanitizer,
    public alertCtrl: AlertController,
    private fire: AngularFireAuth,
    public events: Events,
    public loadingCtrl: LoadingController
    ) {

    //amount durchgeschliffen für payment
    this.amount = navParams.get('amount');
    console.log('amount: '+ this.amount);

    if (this.amount== undefined || this.amount== null){
      this.amount = '0.0';
    }

    this.verify_me_delivered_isidentical=false; //Steurung der adding face

    this.registration = navParams.get('registration');
    this.alertCtrl = alertCtrl;

    // für debug test
    // this.testuserId='02mMPGAy5DebIM7fs9OEZSkwlGx1'; //vergeben von firebase bei Registrierung
    // this.testuserId_faceapi=(this.testuserId.toLowerCase())+'005'; // faceapi kann nur kleinbuchstaben
    // this.groupName='OptionalerGruppenName';
    // this.personGroupId='group_from_user'+this.testuserId_faceapi; // selbst generierte personGroupId
    // this.username='OptionalerUserName';
    // this.personId='994bbcb2-7ea3-4cf1-bf46-d2e1c5b732d2';

    // für debug MARA Test
    //this.testuserId='bkQCX0IUqIUgkteYDphIi475Ypu1'; //vergeben von firebase bei Registrierung
    //this.testuserId_faceapi=(this.testuserId.toLowerCase());
    // Schritt 1: registrierung der gruppe und der person in faceapi und firebase
    //this.personGroupId='group_from_user'+this.testuserId_faceapi;
    // this.groupName='OptionaleGruppenInfromationen';
    // this.username='OptionaleUserInformationen';
    //Person id wird von faceApi erzeugt, zum Testen wird diese aber eingepflegt
    //this.personId= '6101bbf8-eb3e-4dc1-9027-ba61d87430f4';

    //normaler Ablauf
    this.userId = this.fire.auth.currentUser.uid;       // aktuell angemeldeter UserId, vergeben von firebase bei Registrierung
    //userId wird von firebase erzeugt, zum Testen kann diese verwendet werden
    //this.userId = 'bkQCX0IUqIUgkteYDphIi475Ypu1';

    this.userId_faceapi = (this.userId.toLowerCase());  // bei faceapi sind nur kleinbuchstaben erlaubt
    this.personGroupId = 'group_from_user' + this.userId_faceapi;
    this.groupName='OptionaleGruppenInfromationen';
    this.userName='OptionaleUserInformationen';

    //personId wird von faceApi erzeugt, zum Testen kann diese verwendet werden
    //this.personId= '6101bbf8-eb3e-4dc1-9027-ba61d87430f4';


    this.loading = this.loadingCtrl.create({
      content: 'Wir arbeiten für dich...'
    });

    // eventhandler für:
    // 1. "von Registrierung kommend" oder
    // 2. "vom basket kommend"
    this.myeventhandler();
  }

  myeventhandler(){
    console.log('hello eventhandler');
    console.log('this.registration: '+this.registration);
    console.log('this.amount: '+this.amount);

    //if (this.registration == undefined || this.registration == null || this.registration == false){
    if (this.registration == true){
      console.log('eventhandler registrieren');
      this.creation_new(this.groupName, this.personGroupId, this.userId, this.userName)
    }

    if (this.amount != '0.0'){
      console.log('eventhandler bezahlen');
      this.bezahlen();
    }
    console.log('goodbye eventhandler');
  }


  bezahlen(){
    console.log('hello bezahlen');

    return this.PersonIdFromFirebase()
    .then(() => this.takePictureAndUploadToFirebase(this.userId))
    .then(() => this.verify_me(this.userId, this.pictureName, this.img_url, this.personId, this.personGroupId))
    .then(() => this.addingface(this.userId, this.pictureName, this.personGroupId, this.personId, this.img_url));

  }

  PersonIdFromFirebase(){
    console.log('hello PersonIdFromFirebase');
    return new Promise((resolve, reject)=>{
      this.FirebaseService.getPersonId(this.fire.auth.currentUser.uid,this.personGroupId)
      .then(result=>{
          this.personId=JSON.stringify(result);
          this.personId = this.personId.substring(1, this.personId.length-1);
          console.log('PersonIdFromFirebase: '+this.personId);
          //this.alert('personId: ' + this.personId);
      }).catch(console.log);
      console.log('goodbye PersonIdFromFirebase');
      resolve(true);
    });//end promise
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['Okay']
    }).present();
  }

  presentLoadingDefault() {
    this.loading.present();
  }

  presentDismissDefault(){
    console.log('presentDismissDefault');
    this.loading.dismiss();
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // *******************************************************
  // Schritte 5.0 bis 5.3
  // Zentrale Funktion um Person zu verifizieren
  // faceID wird von FaceApi erzeugt
  // *******************************************************

  verify_me(userId:string, pictureName:string, img_url:string, personId:string, personGroupId:string){
    // Schritt 5.0: Bild URL für upload zu faceApi auslesen
    // Schritt 5.1: Bild zu faceApi - face detect hochladen. FaceId wird zurückgegeben
    // Schritt 5.2: Aufruf Verifikation mit faceID, personId und personId
    // Schritt 5.3: Weiterleitung an payment

    console.log("Hello function verify_me");


    // Schritt 5.0: Bild URL für upload zu faceApi auslesen
    this.getUrlfromFirebaseUserPictures(userId, pictureName)
    .then(resultgetUrlfromFirebaseUserPictures=>{
      if(resultgetUrlfromFirebaseUserPictures){
        console.log('resultgetUrlfromFirebaseUserPictures: '+resultgetUrlfromFirebaseUserPictures);

        console.log('userId:        '+userId);
        console.log('pictureName:   '+pictureName);
        console.log('img_url:       '+this.img_url);
        console.log('personId:      '+personId);
        console.log('personGroupId: '+personGroupId);

        setTimeout(() => {


        // Schritt 5.1: Bild zu faceApi - face detect hochladen. FaceId wird zurückgegeben
        this.faceapi.FaceIdFromFaceDetect(this.img_url)
        .then(resultFaceIdFromFaceDetect=>{
          console.log('Schritt 5.1 resultFaceIdFromFaceDetect: '+ JSON.stringify(resultFaceIdFromFaceDetect));
          //this.faceId=JSON.stringify(resultFaceIdFromFaceDetect[0]['faceId']);
          this.faceId=(resultFaceIdFromFaceDetect[0]['faceId']);
          console.log('Schritt 5.1 verify_me this faceid: '+ this.faceId);

          //Schritt 5.2: Aufruf Verifikation mit faceID, personId und personId
          // Rückgabe erfolgt in der From:
          // "isIdentical": true,
          // "confidence": 0.9
          this.faceapi.VerificationFromVerify(this.faceId, personId, personGroupId)
          .then(resultVerificationFromVerify=>{
            console.log('Schritt 5.2 resultVerificationFromVerify: '+ JSON.stringify(resultVerificationFromVerify));
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

            //this.alert('this.isIdentical: '+this.verify_isIdentical);
            //this.alert('this.verify_confidence: '+this.verify_confidence);

            //Schritt 5.3:
            // wenn beide Rückgabewerte die definierten Schwellen erreicht haben, dann erfolgt eine Weiterleitung an die payment Funktion
            if (this.verify_isIdentical==true && this.verify_confidence>=0.6){
              console.log('push to payment');
              this.verify_me_delivered_isidentical=true;
              this.navCtrl.push(PaymentPage, {amount: this.amount});
            } else {
              console.log('kein push to payment, da nicht identisch oder confidence zu gering');
              this.verify_me_delivered_isidentical=false;
              this.alert('Du wurdest leider nicht erkannt. Bitte versuche es noch einmal.');
              this.navCtrl.setRoot(BasketPage);

            }

          });//end resultVerificationFromVerify
        });//end resultFaceIdFromFaceDetect


        console.log('goodbye verify_me');
        }, 5000);


      } else {
        console.log('Error@ verify_me resultgetUrlfromFirebaseUserPictures');
      }
    });//end resultgetUrlfromFirebaseUserPictures
  }

  // *******************************************************
  // Schritt 5.0
  // HilfsFunktion um die URL des hochgelandenen Bildes zu ermitteln
  // img_url wird erzeugt
  // *******************************************************

  getUrlfromFirebaseUserPictures(userId:string, pictureName:string){
    console.log("Hello function getUrlfromFirebaseUserPictures");
    console.log('getUrlfromFirebaseUserPictures: '+userId);
    console.log('getUrlfromFirebaseUserPictures: '+pictureName);

    // BSlbiKEtVIUdlYy2mfd35PyfR5d2
    // d962b860-c0f4-4322-bf0b-2555a3c67f01_1533736701953.png
    // https://firebasestorage.googleapis.com/v0/b/payment-restaurant.appspot.com/o/UserPictures%2FBSlbiKEtVIUdlYy2mfd35PyfR5d2%2Fd962b860-c0f4-4322-bf0b-2555a3c67f01_1533736701953.png

    return new Promise((resolve, reject)=>{
      //this.ImagesRef.child(userId).child(pictureName).getDownloadURL()

      this.img_url='https://firebasestorage.googleapis.com/v0/b/payment-restaurant.appspot.com/o/UserPictures%2F' +
      userId +
      '%2F'+
      pictureName +
      '?alt=media';

      console.log('getUrlfromFirebaseUserPictures: '+this.img_url);

      resolve(true);

    });//end promise


    // return new Promise((resolve, reject)=>{
    //   this.ImagesRef.child(userId).child(pictureName).getDownloadURL()
    //   .then(result=>{
    //     console.log('getUrlfromFirebaseUserPictures: '+ result);
    //     this.img_url=result+'?alt=media';
    //     resolve(true);
    //   }, err=>{
    //     console.log('Error@ getUrlfromFirebaseUserPictures'+ err);
    //     reject(err);
    //   });//end result
    // });//end promise
  }

  // *******************************************************
  // Schritt 4.0
  // Funktion um ein Gesicht einer Person zuzuordnen
  // und die Maschine zu trainieren
  // *******************************************************

  addingface(userId:string, pictureName:string, personGroupId:string, personId, img_url:string){

    console.log("Hello function addingface");

    if (this.verify_me_delivered_isidentical==true) {

      this.getUrlfromFirebaseUserPictures(userId, pictureName)
      .then(resultgetUrlfromFirebaseUserPictures=>{
        if(resultgetUrlfromFirebaseUserPictures){
          console.log('resultgetUrlfromFirebaseUserPictures: '+resultgetUrlfromFirebaseUserPictures);

          setTimeout(() => {

              // Schritt 3.3: addFace in faceApi
              this.addingfacetofaceApi(personGroupId,personId, img_url)
              .then(resultaddingfacetofaceApi=>{
                console.log('resultaddingfacetofaceApi: '+resultaddingfacetofaceApi);
                this.persistedFaceId=JSON.stringify(resultaddingfacetofaceApi);

                // Schritt 3.4: Machine learning - Maschine trainieren
                this.faceapi.TrainTheMachine(personGroupId);

              });//end resultCreatePersonGroupPerson

          console.log('goodbye addingface');
        }, 10000);

        } else {
          console.log('Error@ resultgetUrlfromFirebaseUserPictures: '+resultgetUrlfromFirebaseUserPictures);
        }
      });//end resultgetUrlfromFirebaseUserPictures
    } else {
      // this.verify_me_delivered_isidentical hat false geliefert
      // Gesicht/Selfie wird nicht hinzugefügt
    }

  }

  // *******************************************************
  // Schritt 4.1
  // HilfsFunktion um ein Gesicht einer Person zuzuordnen
  // persistedFaceId wird erzeugt
  // *******************************************************

  addingfacetofaceApi(personGroupId:string, personId:string, img_url:string){
    // Schritt 3.3: addFace in faceApi
    // Rückgabe: persistedFaceId

    console.log("Hello function addingfacetofaceApi");

    return new Promise((resolve, reject)=>{
      this.faceapi.PersonGroupPersonAddFace(personGroupId,personId,img_url)
      .then((result)=> {
          console.log(JSON.stringify('Adding Face to Person successful'));
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
        console.log("Error@ Adding Face to Person: " + err);
        reject(err);
      }); //end result
    });//end promise

  }

  // *******************************************************
  // TestFunktion um ein Bild einer Person zuzuordnen
  // *******************************************************

  // testfunktion_addingface(){
  //   this.addingface('IMG_5193.jpg');
  // }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// *******************************************************
// Zentrale Funktion für Registrierung
// *******************************************************

creation_new(groupName:string, personGroupId:string, userId:string, username:string){

    return this.createPersonGroup_FaceApi(groupName, personGroupId)
    .then(() => this.createPersonGroup_Firebase(userId, personGroupId))
    .then(() => this.CreatePersonGroupPerson_FaceApi(personGroupId, username))
    .then(resultCreatePersonGroupPerson=>{
      if(resultCreatePersonGroupPerson){
        console.log('resultCreatePersonGroupPerson personId: '+resultCreatePersonGroupPerson);
        this.personId = JSON.stringify(resultCreatePersonGroupPerson);
        this.personId = this.personId.substring(1, this.personId.length-1);
      }
    })
    .then(() => this.PersonIdCreate_Firebase(userId, personGroupId, this.personId))


    //nächster schritt: ein selfie machen
    .then(() => this.takePictureAndUploadToFirebase(userId))

    //url zum hochladen auslesen
    .then(() => this.getUrlfromFirebaseUserPictures(userId, this.pictureName))

    //danach das Selfie der Person zuordnen
    .then(() => this.addingface(userId, this.pictureName, personGroupId, this.personId, this.img_url));
}



  // *******************************************************
  // Schritte 1.0 bis 2.1
  // Zentrale Funktion um Gruppe und Person in
  // FaceApi und firebase anzulegen
  // *******************************************************

  xxx_zum_loeschen_createGroupAndPersonInFaceApiAndFirebase(groupName:string, personGroupId:string, userId:string, username:string){
    // Schritt 1:   Gruppe in FaceApi anlegen
    // Schritt 1.1: Gruppe in Firebase anlegen
    // Schritt 2:   Person in FaceApi anlegen und personId anfordern
    // Schritt 2.1: erzeugte personId in firebase ablegen

    //zum Testen:
    //GroupId: group_from_user02mmpgay5debim7fs9oezskwlgx1005
    //personId: 994bbcb2-7ea3-4cf1-bf46-d2e1c5b732d2

    console.log("Hello function 1.0-2.1 createGroupAndPersonInFaceApiAndFirebase",groupName,personGroupId,userId,username);

    // Schritt 1: Gruppe in FaceApi anlegen
    this.createPersonGroup_FaceApi(groupName, personGroupId)
      .then (resultPersonGroupCreate=> {
        if (resultPersonGroupCreate){
            console.log('resultPersonGroupCreate: '+resultPersonGroupCreate);
            // Schritt 1.1: Gruppe in Firebase anlegen
            this.createPersonGroup_Firebase(userId, personGroupId)
            .then(resultFirebasePersonGroupCreate=>{
              if(resultFirebasePersonGroupCreate){
                console.log('resultFirebasePersonGroupCreate: '+resultFirebasePersonGroupCreate);
              } else {
                console.log('Error@ GroupAndPersonfaceApiandFirebase resultFirebasePersonGroupCreate');
              }
            });//end resultFirebasePersonGroupCreate

            // Gruppe ist in firebase und faceapi angelegt
            // nun Schritt 2: Person in FaceApi anlegen
            // und personId anfordern und in globale variable schreiben
            this.CreatePersonGroupPerson_FaceApi(personGroupId, username)
            .then(resultCreatePersonGroupPerson=>{
              if(resultCreatePersonGroupPerson){
                console.log('resultCreatePersonGroupPerson personId: '+resultCreatePersonGroupPerson);
                this.personId = JSON.stringify(resultCreatePersonGroupPerson);
                this.personId = this.personId.substring(1, this.personId.length-1);

                //Schritt 2.1 eben erzeugte this.personId in firebase ablegen
                this.PersonIdCreate_Firebase(userId, personGroupId, this.personId)
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

      console.log("Goodbye function 1.0-2.1 createGroupAndPersonInFaceApiAndFirebase");

  }//end GroupAndPersonfaceApiandFirebase

  // *******************************************************
  // Schritt 2.1
  // Funktion um Person in Firebase anzulegen
  // *******************************************************

  PersonIdCreate_Firebase(userId:string, personGroupId:string, personId:string){
    // Schritt 2.1 - personId in firebase speichern
    console.log("Hello function 2.1 PersonIdCreate_Firebase",userId,personGroupId,personId);
    return new Promise((resolve, reject)=>{
      this.UserCreationRef = firebase.database().ref('/User')
      .child(userId).child('FaceRecognition').child(personGroupId)
      .child(personId).set({'FacePersonId':personId})
      .then(result=>{
        console.log('FirebasePersonGroupCreate'+ result);
        console.log("Goodbye function 2.1 PersonIdCreate_Firebase",result);
        resolve(true);
      }, err=>{
        console.log('Error@ FirebasePersonGroupCreate'+ err);
        reject(err);
      });//end result
    });//end promise

  }

  // *******************************************************
  // Schritt 2.0
  // Funktion um Person in FaceApi anzulegen
  // Rückgabe: personId
  // *******************************************************

  CreatePersonGroupPerson_FaceApi(personGroupId:string, username:string){
    // Schritt 2.0 - Person in FaceApi anlegen
    // Rückgabe: personId
    console.log("Hello function 2.0 CreatePersonGroupPerson_FaceApi",personGroupId,username);

    return new Promise((resolve, reject)=>{
      this.faceapi.PersonGroupPersonCreate(personGroupId,username)
      .then((result)=> {
          console.log("Creation of Person successful");
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
          console.log(output.toString());
          console.log("Goodbye function 2.0 CreatePersonGroupPerson_FaceApi",output.toString());
          resolve(output.toString());
      })
      .catch((err) => {
        console.log("Error@ Creation of Person: " + err);
        reject(err);
      }); //end resultPersonGroupCreate
    });//end promise
  }

  // *******************************************************
  // Schritt 1.0
  // Funktion um Gruppe in FaceApi anzulegen
  // *******************************************************

  createPersonGroup_FaceApi(groupName:string, personGroupId:string) {
    // Schritt 1.0 - Personen Gruppe in FaceApi anlegen
    // Rückgabe: null
    console.log("Hello function 1.0 createPersonGroup_FaceApi",groupName,personGroupId);
    return new Promise((resolve, reject)=>{
      this.faceapi.PersonGroupCreate(groupName,personGroupId)
      .then((resultPersonGroupCreate)=> {
          console.log(JSON.stringify('Creation of Group successful: '+resultPersonGroupCreate));
          console.log(JSON.stringify('personGroupId: '+personGroupId));
          console.log("Goodbye function 1.0 createPersonGroup_FaceApi",personGroupId);
          resolve(true);
      })
      .catch((err) => {
        console.log("Error@ Creation of Person Group: " + err);
        reject(err);
      }); //end resultPersonGroupCreate
    });//end promise
  }

  // *******************************************************
  // Schritt 1.1
  // Funktion um Gruppe in Firebase anzulegen
  // *******************************************************

  createPersonGroup_Firebase(userId:string, personGroupId:string) {
    // Schritt 1.1 - Personen Gruppe in Firebase anlegen
    console.log("Hello function 1.1 createPersonGroup_Firebase",userId,personGroupId);
    return new Promise((resolve, reject)=>{
      this.UserCreationRef =firebase.database().ref('/User')
      .child(userId).child('FaceRecognition')
      .child(personGroupId).set({'FaceGroupId':personGroupId})
      .then(result=>{
        console.log('FirebasePersonGroupCreate'+ result);
        console.log("Goodbye function 1.1 createPersonGroup_Firebase",result);
        resolve(true);
      }, err=>{
        console.log('Error@ FirebasePersonGroupCreate'+ err);
        reject(err);
      });//end result
    });//end promise
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // *******************************************************
  // Schritte 3.0 bis 3.2
  // Zentrale Funktion um ein Selfie zu erzeugen,
  // in ein blob umzuwandeln und in firebase hochzuladen
  // *******************************************************

  takePictureAndUploadToFirebase(userId:string){

    // Schritt 3.0: Bild machen
    // Schritt 3.1: Bild in blob umzuwandeln
    // Schritt 3.2: blob in firebase hochladen

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

    return new Promise((resolve, reject)=>{

      // Schritt 3.0: Bild machen
      this.camera.getPicture(options)
      .then((imageData) => {

         console.log('imageData: ');
         console.log(imageData);

         // Schritt 3.1: Bild in blob umzuwandeln
         this.base64Image_Blob = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

         //Image mit attribtute für die Anzeige auf App-Seite
         this.base64Image_mit_attrib = 'data:image/jpeg;base64,' + imageData;

         // Schritt 3.2: Bild in firebase hochladen und link zu firebase generieren
         this.upload(userId);

         console.log('YEAAHHH endlich hochgeladen :D');

         resolve(true);
      })
    });

  }

  // *******************************************************
  // Schritt 3.1
  // HilfsFunktion um die Bilddatei in ein Blob umzuwandeln
  // *******************************************************

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  // *******************************************************
  // Schritt 3.2
  // HilfsFunktion um den Blob in Firebase hochzuladen
  // *******************************************************

  upload(userId:string) {

    if (this.base64Image_Blob) {

      this.pictureName = this.personId + '_'+ new Date().getTime() + '.png';
      var uploadTask = firebase.storage().ref().child('UserPictures/').child(userId).child(this.pictureName).put(this.base64Image_Blob);
      uploadTask.then(this.onSuccess, this.onError);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // *******************************************************
  // allg. Funktionen zum Start der Seite
  // *******************************************************

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceRecognitionPage');
    this.presentLoadingDefault();
  }

  ionViewDidLeave(){
    this.presentDismissDefault();
  }
  goToBasket(){
    this.navCtrl.push(BasketPage);
  }

  // *******************************************************
  // Funktionen zur Anzeige der Camera Bilder
  // *******************************************************
  // nur zur Erinnerung: Funktioniert nicht, da keine Attribute hier vorhanden
  // getImgContent1(): SafeUrl {
  //   return this.domSanitizer.bypassSecurityTrustUrl(this.base64Image);
  // }

  getImgContent2(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(this.base64Image_mit_attrib);
  }

  pushUserStartPage() {
    this.navCtrl.push(UserStartPage);
  }

  pushUserViewPage() {
    this.navCtrl.push(UserViewPage);
  }
}
