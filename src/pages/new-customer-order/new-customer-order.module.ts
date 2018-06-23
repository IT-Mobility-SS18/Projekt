import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCustomerOrderPage } from './new-customer-order';

@NgModule({
  declarations: [
    NewCustomerOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCustomerOrderPage),
  ],
})
export class NewCustomerOrderPageModule {}
