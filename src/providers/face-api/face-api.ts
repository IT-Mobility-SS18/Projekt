import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { faceApiConfig } from '../../environment';

@Injectable()
export class FaceApiProvider {

  public subscriptionKey:string;
  public personGroupId:string;
  public personId:string;
  public username:string;
  public detectFaceId:string;
  public persistedFaceId:string;


  public data: any = null;
  public result: any = {};

  public gitimgurl1:string;
  public gitimgurl2:string;
  public gitimgurl3:string;

  constructor(public http: HttpClient){
    console.log('Hello FaceApiProvider Provider');
    this.subscriptionKey= faceApiConfig.faceApi;
  }

  // *******************************************************
  // ApiFunktion für Schritt X.X
  // FaceId erzeugen, mithilfe Api face detect
  // *******************************************************

  FaceIdFromFaceDetect(picture_url:string){

    console.log("Hello function FaceIdFromFaceDetect");
    console.log('picture_url'+picture_url);

    //        POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect         ?returnFaceId=true&returnFaceLandmarks=false
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false"
          };

          const httpOptions = {
            headers: myheader,
            params: params,
          };

          let body = JSON.stringify({ url: picture_url});
          //console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              // .subscribe((result) =>{
              //   this.detectFaceId=result[0]['faceId'];
              //   console.log("FaceIdFromFaceDetect: " + this.detectFaceId);
              //   resolve(result);
              //   }
              // );

              .subscribe(result => {
                  // if (result[0]['faceId'] != null) {
                  //     this.detectFaceId=result[0]['faceId'];
                  //     console.log("FaceIdFromFaceDetect: " + this.detectFaceId);
                  //     resolve(result[0]['faceId']);
                  // } else {
                      resolve(result);
                  //}
              }, err => {
                    resolve(err);
              });

    });//end promise

  }

  // *******************************************************
  // ApiFunktion für Schritt X.X
  // Verification der Person, anhand übergebener Ids
  // *******************************************************

  VerificationFromVerify(faceId: string, personId: string, PersonGroupId: string){
    //params
    // "faceId": "c5c24a82-6845-4031-9d5d-978df9175426",
    // "personId": "815df99c-598f-4926-930a-a734b3fd651c",
    // "largePersonGroupId": "sample_group"

    console.log("Hello function VerificationFromVerify: "+faceId);

    //        POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          const httpOptions = {
            headers: myheader
          };

          let body = JSON.stringify({
            "faceId": faceId,
            "personId": personId,
            "PersonGroupId": PersonGroupId
          });

          console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe(result => {
                      resolve(result);
              }, err => {
                    resolve(err);
              });

    });//end promise


  }

  // *******************************************************
  // Zentrale ApiFunktion für Schritt X.X
  // Aufruf für Verification der Person
  // *******************************************************

  // FaceDetectAndVerify(){
  //
  //   console.log("Hello function FaceDetectAndVerify");
  //
  //   this.FaceIdFromFaceDetect().then(result => {
  //     // console.log("im then FaceDetectAndVerify: " + JSON.stringify(result));
  //     // console.log("!!!FaceDetectAndVerify: " + JSON.stringify(this.detectFaceId));
  //     this.VerificationFromVerify(JSON.stringify(result)).then(result2 => {
  //       // console.log("verify"+JSON.stringify(result2));
  //       // console.log("verify: "+JSON.stringify(result2.isIdentical));
  //       // console.log("verify: "+JSON.stringify(result2.confidence));
  //     });
  //   });
  // }

  // *******************************************************
  // ApiFunktion für Schritt X.X
  // Machine Learning
  // *******************************************************

  TrainTheMachine(personGroupId:string){

    console.log("Hello function TrainTheMachine");

    //        POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/    mygroupid       /train
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + personGroupId +'/train/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          const httpOptions = {headers: myheader};

          let body = JSON.stringify("");

          console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe((result) =>{
                console.log("trained: " + result);
                //null ist gut
                }
              );
    });//end promise
  }

  // *******************************************************
  // ApiFunktion für Schritt X.X
  // Gesicht für eine Person in Personengruppe in faceapi anlegen
  // *******************************************************

  PersonGroupPersonAddFace(personGroupId:string, personId:string, picture_url:string){

    console.log("Hello function PersonGroupPersonAddFace");

    //        POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/mypersongroupid     /persons/   mypersonid  /persistedFaces
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + personGroupId +'/persons/'+ personId + '/persistedFaces/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          const httpOptions = {headers: myheader};

          let body = JSON.stringify({ url: picture_url});

          console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe((result) =>{
                  //this.persistedFaceId=result[0].persistedFaceId;
                  resolve(result);
              }, err => {
                  reject(err.statusText);
              });
    });//end promise
  }

  // *******************************************************
  // ApiFunktion für Schritt 2.0
  // Person in Personengruppe in faceapi anlegen
  // *******************************************************

  PersonGroupPersonCreate(personGroupId:string, username:string){

    console.log("Hello function PersonGroupPersonCreate: "+personGroupId+","+username);

    //POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/7z3748fbund23d4/persons
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + personGroupId +'/persons/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          const httpOptions = {headers: myheader};

          let body = JSON.stringify({name: username});
          //console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe(result => {
                  resolve(result);
              }, err => {
                  reject(err.statusText);
              });
    });//end promise
  }

  // *******************************************************
  // ApiFunktion für Schritt 1.0
  // Personengruppe in faceapi anlegen
  // *******************************************************

  PersonGroupCreate(groupName:string, personGroupId:string) {

        console.log("Hello function PersonGroupCreate");

        let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + personGroupId +'/';

        return new Promise((resolve, reject)=>{
              const myheader = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)
              const httpOptions = {headers: myheader};
              let body = JSON.stringify({name: groupName});
              //console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));
              this.http
                  .put(uriBase, body, httpOptions)
                  .subscribe(result => {
                          //console.log("result.status: "+result.status);
                          resolve(result);
                  }, err => {
                        // console.log("err.message: "+err.message);
                        // console.log("err.status: "+err.status);
                        // console.log("err.statusText: "+err.statusText);
                        reject(err.statusText);
                  });

                  // if (response.statusCode >= 200 && response.statusCode <= 299) {
                  //       resolve({ response: response, body: body });
                  //   } else {
                  //       reject({ response: response, body: body });

        });//end promise
  }

  sendRequest(sourceImageUrl:string, subscriptionKey?:string, uriBase?:string){

    uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    //Promises allow us to elegantly handle some API call.
    return new Promise((resolve, reject)=>{
          //Set the headers with the subscription key
          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key',this.subscriptionKey)
          // Request parameters.
          var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
          };
          //Prepare the body with a json object containing the image URL to be analyzed
          let body = JSON.stringify({ url: this.gitimgurl1});
          //Options object used to pass our headers and params.
          const httpOptions = {
            headers: myheader,
            params: params,
          };

          console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          //Fire request at the url with params+abody
          this.http
              .post(uriBase, body, httpOptions)
              .subscribe((result) =>{
                //Do something with result
                resolve(result);
              });
    });//end promise
  }

  checkFaceAPI(faceUrlToCheck?:string):Promise<any>{

    console.log("Making request to face API with URL" + faceUrlToCheck);


    // var promise = new Promise(function(resolve, reject) {
    //   // do a thing, possibly async, then…
    //
    //   if (/* everything turned out fine */) {
    //     resolve("Stuff worked!");
    //   }
    //   else {
    //     reject(Error("It broke"));
    //   }
    // });



    return new Promise((resolve, reject) => {
    this.sendRequest(faceUrlToCheck)
      .then((result => {

        let emotionsObject = result[0]['faceAttributes']['emotion'];
        var correctEmotion=Object.keys(emotionsObject)
                                .reduce(function(a, b){
                                  return emotionsObject[a] > emotionsObject[b] ? a : b
                                })

          var hasGlasses = result[0]['faceAttributes']['glasses']
          var gender = result[0]['faceAttributes']['gender']
          var age = result[0]['faceAttributes']['age']
          console.log(result)
          console.log("Correct Emotion"+ result[0]['faceAttributes']['emotion']['happiness']);
          console.log("Correct Emotion"+ result[0]['faceAttributes']['emotion']);
          console.log("Correct Emotion"+correctEmotion);

          resolve({
            correctEmotion : correctEmotion,
            hasGlasses : hasGlasses,
            gender : gender,
            age: age,
            emotionsObject : emotionsObject
          })
      }));
    })

  }

}
