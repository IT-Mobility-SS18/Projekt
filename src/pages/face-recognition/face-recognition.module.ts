import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaceRecognitionPage } from './face-recognition';

@NgModule({
  declarations: [
    FaceRecognitionPage,
  ],
  imports: [
    IonicPageModule.forChild(FaceRecognitionPage),
  ],
})
export class FaceRecognitionPageModule {}
