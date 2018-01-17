import { Component } from '@angular/core';
import { Order } from '../order/order'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavbarPage');
    this.orderPresent();
  }
   
  orderPresent(){
      var order_items = JSON.parse(window.localStorage.getItem('order-items'));
      var order = JSON.parse(window.localStorage.getItem('order'));
      var user = JSON.parse(window.localStorage.getItem('user'));
      debugger;
      var filteredOrder = [];
      if(order_items && user){
              for(var i = 0;i<order_items.length; i++){
                if(order_items[i].quantity > 0){
                  filteredOrder.push(order_items[i]);
                }
              }

              if(order){
                var orderId = order_items[0].order_id;
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
      this.order_items = order.length;
      
  }

  seeOrder(){

      var order = JSON.parse(window.localStorage.getItem('order'));
      var restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      var user = JSON.parse(window.localStorage.getItem('user'));
      console.log(order);
      console.log(restaurants);
      if(order && restaurants ){
        this.navCtrl.push(Order,{orderId: order.id, restaurants: restaurants});  
      }
      else{
        order = JSON.parse(window.localStorage.getItem('order-items'));
        if(order && user){
          this.navCtrl.push(Order, {orderId: order[0].order_id, restaurants: restaurants});  
        }
        else{
          this.auth.logout();
        }
        
      }
      
  }
}
