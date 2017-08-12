import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Order } from './order';

@NgModule({
  declarations: [
    Order,
  ],
  imports: [
    IonicPageModule.forChild(Order),
    CommonModule
  ],
  exports: [
    Order
  ]
})
export class OrderModule {}
