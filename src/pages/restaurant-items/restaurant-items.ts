import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsPage } from '../restaurants/restaurants';
import { ApplicationService } from '../../providers/application';
import { AuthService } from '../../providers/auth-service';

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
    order_items_a;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {
      var order = JSON.parse(window.localStorage.getItem('order'));
      this.order_items_a = [];
      var a =[];
      this.items = navParams.get('items');
      this.order_items = navParams.get('order_items');
      this.order_items.map(function(x){
          if(x && order){
              if(x.order_id == order.id){
                  a.push(x.item_id);
              }

          }
      });
      this.order_items_a = a;
      console.log(this.items);
      console.log(this.order_items);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantItems');


  }

  increaseQuan(item){
      item.quantity++;
      console.log(item.id, item.restaurant_id, item.quantity);
      this.appy.addOrderItems(item.id, item.restaurant_id, item.quantity);
  }
  decreaseQuan(item){
      item.quantity--;
      this.appy.addOrderItems(item.id, item.restaurant_id, item.quantity);

  }
  increaseQuanO(item){
      item.quantity++;
      console.log(item.id, item.restaurant_id, item.quantity);
      this.appy.addOrderItems(item.item_id, item.restaurant_id, item.quantity);
  }
  decreaseQuanO(item){
      item.quantity--;
      this.appy.addOrderItems(item.item_id, item.restaurant_id, item.quantity);

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
      var order = JSON.parse(window.localStorage.getItem('order'));
      if(item.id == Oitem.item_id && Oitem.order_id ==order.id){
          return true;
      }
      else{
          return false;
      }
  }


}
