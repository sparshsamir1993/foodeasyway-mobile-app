import { Component } from '@angular/core';
import { Order } from '../order/order'
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NavbarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-navbar',
  templateUrl: 'navbar.html',
})
export class NavbarPage {
    order_items;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavbarPage');
  }

  orderPresent(){
      var order = JSON.parse(window.localStorage.getItem('order-items'));
      if(order){
          this.setOrderItems(order);
          return true;
      }
      else{
          return false;
      }
  }
  setOrderItems(order){
      this.order_items = order.length;
      console.log(this.order_items)
  }

  seeOrder(){
      var order = JSON.parse(window.localStorage.getItem('order'));
      var restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      console.log(order);
      console.log(restaurants);
      this.navCtrl.push(Order,{orderId: order.id, restaurants: restaurants});
  }
}