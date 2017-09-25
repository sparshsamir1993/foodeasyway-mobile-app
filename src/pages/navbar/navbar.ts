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
      this.order_items = order.length;
      console.log(this.order_items)
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
