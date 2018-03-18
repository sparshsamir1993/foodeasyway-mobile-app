import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsPage } from '../restaurants/restaurants';
import { ApplicationService } from '../../providers/application';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { Order } from '../order/order';
import * as $ from 'jquery'
/**
 * Generated class for the RestaurantItems page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-restaurant-items',
  templateUrl: 'restaurant-items.html',
  providers: [ApplicationService, AuthService]

})
export class RestaurantItems {
    items;
    order_items;
    order_items_display;
    order_items_a;
    order_type_json;
    order_type_arr;
    types =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService, public auth: AuthService) {
    

  }
  ionViewWillEnter(){
      var orderItem = window.localStorage.getItem('order-items');
      orderItem = orderItem ? orderItem : "{}";
      var orderStore = window.localStorage.getItem('order');
      orderStore = orderStore ? orderStore : "{}";
      if(orderStore){
        if(orderStore == undefined || orderStore == "undefined"){
            orderStore = "{}"
        }
      }
      console.log(orderItem, orderStore);
      var orderItemInStore = JSON.parse(orderItem);
      this.order_items = this.navParams.get('order_items');
      var order = JSON.parse(orderStore);
      var sameOrder = false;
      if(orderItemInStore != null){
        if(orderItemInStore.length >0){
            var order_id = orderItemInStore[0].order_id;  
            if(order)
            {
                console.log(order.id);
                
                if(order.id == orderItemInStore[0].order_id)
                {
                    sameOrder = true;
                }
            }  
      
        }
     }else{
         order_id = "";
     }   
      this.order_items_a = [];
      var a =[];
      this.items = this.navParams.get('items');
      console.log(sameOrder);
      this.order_items.map(function(x){
          if(x && orderItemInStore && sameOrder){
              if(x.order_id == order_id){
                  a.push(x.item_id);
              }

          }
      });
      this.order_items_a = a;
      console.log(this.items);
      var itemTypeJson = {};
      for( var item in this.items)
      {
        a = []
        
        var type = this.items[item].item_type;
        this.types.push(type);	
        for( var item1 in this.items)
        {
                if(this.items[item1].item_type === type)
                {
                        a.push(this.items[item1])
                }
            }
            itemTypeJson[type] = a;
      }
      this.order_type_json = itemTypeJson;
      console.log(this.order_items);
      console.log(this.order_type_json);
      a= [];
      for(var i in this.order_type_json)
      {
        var b = {};
        b[i] = this.order_type_json[i]
        a.push(b)
      }
      this.order_type_arr = a;
      console.log(this.order_type_arr);
      this.types = $.unique(this.types);
      console.log(this.types);
      
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantItems');


  }

  increaseQuan(item){
      item.quantity++;
      console.log(item.id, item.restaurant_id, item.quantity, item.name);
      this.appy.addOrderItems(item.id, item.restaurant_id, item.quantity, item.name);
  }
  decreaseQuan(item){
      item.quantity--;
      this.appy.addOrderItems(item.id, item.restaurant_id, item.quantity, item.name);

  }
  increaseQuanO(item){
      item.quantity++;
     console.log(item.id, item.restaurant_id, item.quantity, item.name);
      this.appy.addOrderItems(item.item_id, item.restaurant_id, item.quantity, item.name);
  }
  decreaseQuanO(item){
      item.quantity--;
      this.appy.addOrderItems(item.item_id, item.restaurant_id, item.quantity, item.name);

  }
  sameType(type, item){
      if(item.item_type === type){
          return true;
      }
      else{
          return false;
      }
  }

  presentInOrder(item){
      if(this.order_items_a.includes(item.id)){
          return true;
      }
      else{
          return false;
      }
  }
  getQuantity(item, Oitem){
      var order_id = JSON.parse(window.localStorage.getItem('order-items'))[0].order_id;
      if(item.id == Oitem.item_id && Oitem.order_id ==order_id){
          return true;
      }
      else{
          return false;
      }
  }

  orderPresent(){
      var order = JSON.parse(window.localStorage.getItem('order-items'));
      var filteredOrder = [];
      if(order){
              for(var i = 0;i<order.length; i++){
                if(order[i].quantity > 0){
                  filteredOrder.push(order[i]);
                }
              }

      }
      if(filteredOrder){
          this.setOrderItems(filteredOrder);
          return true;
      }
      else{
          return false;
      }
  }
  setOrderItems(order){
      this.order_items_display = order.length;
      
  }
   seeOrder(){
      var order = JSON.parse(window.localStorage.getItem('order'));
      var restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      console.log(order);
      console.log(restaurants);
      if(order && restaurants){
        this.navCtrl.push(Order,{orderId: order.id, restaurants: restaurants});  
      }
      else{
        order = JSON.parse(window.localStorage.getItem('order-items'));
        if(order){
          this.navCtrl.push(Order, {orderId: order[0].order_id, restaurants: restaurants});  
        }
        else{
          this.auth.logout();
        }
        
      }
      
  }


}
