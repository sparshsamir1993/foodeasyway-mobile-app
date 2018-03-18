import { NavbarPage } from './../navbar/navbar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantsPage } from './restaurants';
import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    RestaurantsPage,
    NavbarPage
  ],
  imports: [
    IonicPageModule.forChild(RestaurantsPage),
    IonicImageLoader
  ],
  exports: [
    RestaurantsPage,
    NavbarPage
  ]
})
export class RestaurantsModule {}
