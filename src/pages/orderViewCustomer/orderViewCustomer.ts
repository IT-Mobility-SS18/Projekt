import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides} from 'ionic-angular';



@Component({
  selector: 'page-orderViewCustomer',
  templateUrl: 'orderViewCustomer.html'
})

export class OrderViewCustomerPage {
  public images: any;
     @ViewChild('slider') slider: Slides;
     page = 0;
     constructor(public navCtrl: NavController) {
     }

     selectedTab(index) {
       this.slider.slideTo(index);
     }

}
