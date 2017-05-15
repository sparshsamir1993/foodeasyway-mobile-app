import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantItems } from './restaurant-items';

@NgModule({
  declarations: [
    RestaurantItems,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantItems),
  ],
  exports: [
    RestaurantItems
  ]
})
export class RestaurantItemsModule {}
