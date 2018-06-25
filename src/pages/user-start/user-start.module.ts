import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserStartPage } from './user-start';

@NgModule({
  declarations: [
    UserStartPage,
  ],
  imports: [
    IonicPageModule.forChild(UserStartPage),
  ],
})
export class UserStartPageModule {}
