import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantsPage } from './restaurants';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    RestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantsPage),
    IonicImageLoader
  ],
  exports: [
    RestaurantsPage
  ]
})
export class RestaurantsModule {}
