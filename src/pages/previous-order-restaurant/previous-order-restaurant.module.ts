import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousOrderRestaurantPage } from './previous-order-restaurant';

@NgModule({
  declarations: [
    PreviousOrderRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousOrderRestaurantPage),
  ],
  exports: [
    PreviousOrderRestaurantPage
  ]
})
export class PreviousOrderRestaurantPageModule {}
