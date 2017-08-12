import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Order page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class Order {
    orderId;
    restaurants;
    orderItems;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.orderItems = JSON.parse(window.localStorage.getItem('order-items'));
      this.restaurants = navParams.get('restaurants');
      console.log(this.orderItems);
      console.log(this.restaurants);

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Order');
  }

  getOrderItems(id, restauranst){

  }

  deleteOItem(item){
    console.log(item);
    //this.appy.destroyOItem(item);
  }

  presentInRest(rest, item){
    if(rest.id == item.restaurant.id){ 
      return true;
    }
  }
}
