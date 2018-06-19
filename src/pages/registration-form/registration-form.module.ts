import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationFormPage } from './registration-form';

@NgModule({
  declarations: [
    RegistrationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationFormPage),
  ],
})
export class RegistrationFormPageModule {}
