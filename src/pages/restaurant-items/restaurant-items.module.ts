import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantItems } from './restaurant-items';
import { NavbarPage } from './../navbar/navbar';

@NgModule({
  declarations: [
    RestaurantItems,
    NavbarPage
  ],
  imports: [
    IonicPageModule.forChild(RestaurantItems),
  ],
  exports: [
    RestaurantItems,
    NavbarPage
  ]
})
export class RestaurantItemsModule {}
