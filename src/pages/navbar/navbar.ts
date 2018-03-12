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
    order : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad NavbarPage');
    this.orderPresent();
  }
   
  orderPresent(){
      var order_items = JSON.parse(window.localStorage.getItem('order-items'));
      if(order_items == null){
        order_items = "";
      }
      try{
        this.order = JSON.parse(window.localStorage.getItem('order'));            
      }catch(e){
        this.order = ""
      }

      var user = JSON.parse(window.localStorage.getItem('user'));
      var filteredOrder = [];
      if(order_items.length > 0 && user && this.order){
              for(var i = 0;i<order_items.length; i++){
                if(order_items[i].quantity > 0){
                  filteredOrder.push(order_items[i]);
                }
              }

              if(this.order){
                var orderId = order_items[0].order_id;
              }

      }
      if(filteredOrder.length >0){
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
        if(order.length>0 && user.length >0){
          this.navCtrl.push(Order, {orderId: order[0].order_id, restaurants: restaurants});  
        }
        else{
          this.auth.logout();
        }
        
      }
      
  }
}
