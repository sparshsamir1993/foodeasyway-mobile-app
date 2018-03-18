import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressesPage } from './addresses';

@NgModule({
  declarations: [
    AddressesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressesPage),
  ],
  exports: [
    AddressesPage
  ]
})
export class AddressesPageModule {}
