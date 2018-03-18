import { OrderStatusPage } from './../order-status/order-status';
import { Component } from '@angular/core';
import { ApplicationService } from '../../providers/application';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
    order_restaurant;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService, public alertCtrl: AlertController) {
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
    this.appy.addOrderItems(item.item_id, item.restaurant.id, 0, item.name);
    this.orderItems = JSON.parse(window.localStorage.getItem('order-items'));
    this.getRestaurantTotal(this.orderItems);
     for(var i = 0; i < this.orderItems.length; i++) {
 
      if(this.orderItems[i].item_id == item.item_id){
        this.orderItems.splice(i, 1);
      }
 
    }
  }

  isRestaurantInOrder(rest){
    var reply = false;
    this.orderItems.map(function(x){
      if(rest.id === x.restaurant.id){
        
        reply =  true;
      }
    });
    if(reply){
      this.totalRest = this.totalsJson[rest.id];
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
  
  

  presentInRest(rest, item){
    if(rest.id == item.restaurant.id){ 
      return true;
    }
  }
  
  confirmOrderAlert(restaurant){
    let alert = this.alertCtrl.create({
      title: 'Confirm Save?',
      message: 'Do you want to send this order to the restaurant?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send Order?',
          handler: () => {
            this.confirmOrder(restaurant)
          }
        }
      ]
    });
    alert.present();
  }
  confirmOrder(restaurant)
  {
    var self = this;
    console.log(restaurant);
    var restaurant_id = restaurant.id;
    var order_items = JSON.parse(window.localStorage.getItem('order-items'));
    this.getOrderRestaurant(restaurant_id);
    
    var grand_total = this.totalsJson[restaurant_id];
    this.appy.confirmOrder(this.order_restaurant,grand_total).then((data)=>{
      
      data = JSON.parse(data['_body']);
      console.log(data);
      if(data['has_user_confirmed'])
      {
        this.navCtrl.push(OrderStatusPage,{
          order_restaurant: data,
          
        });
      }
    });
  }
  getOrderRestaurant(r_id){
    var self = this;
    var order_items = JSON.parse(window.localStorage.getItem('order-items'));
    var rest = order_items.map(function(x){
      if(r_id == x.order_restaurant.restaurant_id){
        self.order_restaurant =  x.order_restaurant;
      }
    });
  }
}
