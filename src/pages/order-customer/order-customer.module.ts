import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
  import { OrderCustomerPage } from './order-customer';

@NgModule({
  declarations: [
    OrderCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCustomerPage),
  ],
})
export class OrderCustomerPageModule {}
