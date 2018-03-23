import { OrderStatusPage } from './../order-status/order-status';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreviousOrderRestaurantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-previous-order-restaurant',
  templateUrl: 'previous-order-restaurant.html',
})
export class PreviousOrderRestaurantPage {

  orderRestaurant;
  orderItems;
  restaurantTotal=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    let self = this;
    this.orderRestaurant = this.navParams.get('order_restaurant');
    this.orderItems = this.orderRestaurant.order_items;
    console.log(this.orderItems);
    this.orderItems.map(function(x){
      self.restaurantTotal +=x.total;
    })
    console.log('ionViewDidLoad PreviousOrderRestaurantPage');
  }

  toOrderStatus(){
    this.navCtrl.push(OrderStatusPage,{order_restaurant: this.orderRestaurant});
  }

}
