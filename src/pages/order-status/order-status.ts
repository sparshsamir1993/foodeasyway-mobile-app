import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';

/**
 * Generated class for the OrderStatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-status',
  templateUrl: 'order-status.html',
})
export class OrderStatusPage {
  status;
  order_restaurant: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {
    this.getOrderRestaurant();
    this.getOrderStatus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderStatusPage');
  }

  getOrderRestaurant(){
    this.order_restaurant = this.navParams.get('order_restaurant');
  }

  getOrderStatus(){
    var order_restaurant_id = this.order_restaurant.id;
    this.appy.getOrderStatus(order_restaurant_id).then((data)=>{
      console.log(data);
      this.status = data['status'];
    });
  }
}
