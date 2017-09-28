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
    totalsJson;
    totalRest;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.orderItems = JSON.parse(window.localStorage.getItem('order-items'));
      this.restaurants = navParams.get('restaurants');
      console.log(this.orderItems);
      console.log(this.restaurants);
      

      
  }
  ionViewWillLoad(){
    this.orderItems = JSON.parse(window.localStorage.getItem('order-items'));
    this.getRestaurantTotal(this.orderItems);
    console.log(this.totalsJson);
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

  isRestaurantInOrder(rest){
    var reply = false;
    this.orderItems.map(function(x){
      if(rest.id === x.restaurant.id){
        
        reply =  true;
      }
    });
    if(reply){
      this.totalRest = this.getTotalRest(rest.id);
      console.log(this.totalRest);
    }
    return reply;
  }

  getRestaurantTotal(orderItems){
    var total = {};
    orderItems.map(function(x){
      var restId = x.restaurant.id;
      if(total[restId] !== undefined){
        total[restId]= total[restId] + x.total;
      }
      else{
        total[restId] = x.total;
      }
    });
    this.totalsJson = total;
  }
  
  getTotalRest(x){
    return this.totalsJson.x;
  }

  presentInRest(rest, item){
    if(rest.id == item.restaurant.id){ 
      return true;
    }
  }
}
