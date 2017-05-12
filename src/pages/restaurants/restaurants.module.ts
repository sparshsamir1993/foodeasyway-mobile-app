import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantsPage } from './restaurants';

@NgModule({
  declarations: [
    RestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantsPage),
  ],
  exports: [
    RestaurantsPage
  ]
})
export class RestaurantsModule {}
