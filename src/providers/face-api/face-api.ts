import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class FaceApiProvider {

  public subscriptionKey : string;
  public personGroupId : string;
  public personId : string;
  public username:string;
  public detectFaceId:string;


  public data: any = null;
  public result: any = {};

  public gitimgurl1:string;
  public gitimgurl2:string;
  public gitimgurl3:string;

  constructor(public http: HttpClient) {
    console.log('Hello FaceApiProvider Provider');
    this.subscriptionKey= "f5c657cce6eb4949bce363fc666d6d5b";
    this.username="FamilyDad"
    this.personGroupId="7z3748fbund23d5";

    this.gitimgurl1="https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family1-Dad/Family1-Dad1.jpg?raw=true";
    this.gitimgurl2="https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family1-Dad/Family1-Dad2.jpg?raw=true";
    this.gitimgurl3="https://github.com/Microsoft/Cognitive-Face-Windows/blob/master/Data/PersonGroup/Family1-Dad/Family1-Dad3.jpg?raw=true";

    //zum test von addface
    this.personId="2d2755b8-216d-4998-a77f-a304b7b01b8e";

    //zum test von verify
    this.detectFaceId="4e0fdc5a-e27a-4c11-bda1-0d0eae32c4df";
  }

  FaceIdFromFaceDetect(){
    //parameters
    //1. url mit bild

    // Promises
    // function do1() {
    //   return service
    //     .do()
    //     // some transformations
    //     .then(result => result.fieldA);
    // }
    //
    // function do2(resultOfDo1) {
    //   return service
    //     .do2(resultOfDo1)
    //     // some transformations
    //     .then(result => result.fieldB);
    // }
    //
    // return do1()
    //       .then(do2);


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

    console.log("Hello function FaceIdFromFaceDetect");

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

          let body = JSON.stringify({ url: this.gitimgurl3});

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
                  if (result[0]['faceId'] != null) {
                      // this.detectFaceId=result[0]['faceId'];
                      // console.log("FaceIdFromFaceDetect: " + this.detectFaceId);
                      resolve(result[0]['faceId']);
                  } else {
                      resolve(result);
                  }
              }, err => {
                    resolve(err);
              });

    });//end promise

  }

  VerificationFromVerify(paramfaceId : string){
    //params
    // "faceId": "c5c24a82-6845-4031-9d5d-978df9175426",
    // "personId": "815df99c-598f-4926-930a-a734b3fd651c",
    // "largePersonGroupId": "sample_group"

    console.log("Hello function VerificationFromVerify"+paramfaceId);

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
            "faceId": paramfaceId,
            "personId": this.personId,
            "PersonGroupId": this.personGroupId
          });

          console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe(result => {
                  if (result.isIdentical != null) {
                      // this.detectFaceId=result[0]['faceId'];
                      // console.log("FaceIdFromFaceDetect: " + this.detectFaceId);
                      resolve(result);
                  } else {
                      resolve(result);
                  }
              }, err => {
                    resolve(err);
              });

    });//end promise


  }


  FaceDetectAndVerify(){

    console.log("Hello function FaceDetectAndVerify");

    this.FaceIdFromFaceDetect().then(result => {
      console.log("im then FaceDetectAndVerify: " + result);
      console.log("!!!FaceDetectAndVerify: " + this.detectFaceId);
      this.VerificationFromVerify(result).then(result2 => {
        console.log("verify"+result2);
        console.log("verify: "+result2.isIdentical);
        console.log("verify: "+result2.confidence);

      });


    });
    }


  TrainTheMachine(){
    //parameters
    //1. personGroupId

    console.log("Hello function TrainTheMachine");

    //        POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/    mygroupid            /train
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + this.personGroupId +'/train/';

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


  PersonGroupPersonAddFace(){
    //parameters
    //1. personGroupId
    //2. personId
    //3. url mit bild

    console.log("Hello function PersonGroupPersonAddFace");

    //        POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/mypersongroupid          /persons/   mypersonid       /persistedFaces
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + this.personGroupId +'/persons/'+ this.personId + '/persistedFaces/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          const httpOptions = {headers: myheader};

          let body = JSON.stringify({ url: this.gitimgurl2});

          console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe((result) =>{
                this.persistedFaceId=result.persistedFaceId;
                console.log("this.persistedFaceId: " +this.persistedFaceId);
                //persistedFaceId

                // this.personId=result.personId;
                // console.log("this.personId: " + this.personId);
                }
              );
    });//end promise


  }


  PersonGroupPersonCreate(){
    //parameters
    //1. personGroupId
    //2. username

    console.log("Hello function PersonGroupPersonCreate");

    //POST https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/7z3748fbund23d4/persons
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + this.personGroupId +'/persons/';

    return new Promise((resolve, reject)=>{

          const myheader = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

          const httpOptions = {headers: myheader};

          let body = JSON.stringify({name: 'FamilyDad'});

          //console.log(uriBase+ JSON.stringify(body)+ JSON.stringify(httpOptions));

          this.http
              .post(uriBase, body, httpOptions)
              .subscribe((result) =>{
                this.personId=result.personId;
                console.log("this.personId" + this.personId);
                }
              );
    });//end promise

  }

  PersonGroupCreate() {
        console.log("Hello function PersonGroupCreate");

        let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + this.personGroupId +'/';

        return new Promise((resolve, reject)=>{

              const myheader = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Ocp-Apim-Subscription-Key', this.subscriptionKey)

              const httpOptions = {headers: myheader};

              let body = JSON.stringify({name: 'test12'});

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
                        reject(err.message);
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
