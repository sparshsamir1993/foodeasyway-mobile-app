import { PreviousOrderRestaurantPage } from './../previous-order-restaurant/previous-order-restaurant';
import { ApplicationService } from './../../providers/application';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreviousOrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-previous-orders',
  templateUrl: 'previous-orders.html',
})
export class PreviousOrdersPage {
  orders;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviousOrdersPage');
  }
  ionViewWillEnter(){
    var user = JSON.parse(window.localStorage.getItem('user'));
    var user_id="";
    if(user)
    {
      user_id = user.id
      this.getOrderHistory(user_id);
    }
  }

  getOrderHistory(user_id)
  {
    this.appy.getUserOrders(user_id).then((data)=>{
      console.log(data);
      this.orders = data;

    },
  (err)=>{

  })
  }

  toOrderRestaurantDetails(restaurant){
    this.navCtrl.push(PreviousOrderRestaurantPage,{order_restaurant: restaurant});
  }

  getRestaurantTotal(o_items)
  {
    var total = 0;
    o_items.map(function(x){
      total += x.total;
    });
    return total;
  }

  getOrderTotal(order_items)
  {
    var total = 0 ;
    order_items.map(function(x){
      total += x.total;
    });
    return total;
  }
}
