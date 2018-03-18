import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressEditPage } from './address-edit/address-edit';

@NgModule({
  declarations: [
    AddressEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressEditPage),
  ],
  exports: [
    AddressEditPage
  ]
})
export class AddressesPageModule {}
