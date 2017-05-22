import { Component , ViewChild} from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { ApplicationService } from "../../providers/application";

import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { RestaurantsPage } from '../restaurants/restaurants'
import { Order } from '../order/order'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApplicationService, AuthService]

})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  order;
  restaurants;
  order_items;
  pages: Array<{title: string, component: any}>;
  pagesNot: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public auth: AuthService, public appy: ApplicationService) {
        console.log(window.localStorage.getItem('token'));
        this.order = JSON.parse(window.localStorage.getItem('order'));
        console.log(this.restaurants);
        this.ifOrder(this.order);
        this.pages = [
                  { title: 'Home', component: HomePage },
                  { title: 'Restaurants', component: RestaurantsPage},
                  { title: 'Logout', component: LogoutPage}
                ];
        this.pagesNot = [
                  { title: 'Login', component: LoginPage },
                  { title: 'Home', component: HomePage }
                ];

  }

      ionViewDidLoad() {
        console.log('ionViewDidLoad Home');
        this.ifOrder(this.order);
      }

      ifOrder(order){
          if(order){
              var order_id = this.order.id;
              var sum =0;
              this.appy.getRestaurants().then((data)=>{
                  console.log(data[0]);
                //   data.forEach(function(x){console.log(x)})
                for(var x in data){
                    console.log(data[x].name);
                    var items = data[x].order_items;
                    for(var item in items){
                        if(items[item].order_id == order_id){
                            sum++;
                        }
                    }
                }
                console.log(sum);
                this.order_items = sum;
              })
          }
      }
      openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
      }

      authenticated(){
          if(window.localStorage.getItem('user')){
              return true;
          }
          else{
              return false;
          }
      }
      orderPresent(){
          var order = JSON.parse(window.localStorage.getItem('order'));
          if(order){
              return true;
          }
          else{
              return false;
          }
      }
      seeOrder(){
          var order = JSON.parse(window.localStorage.getItem('order'));
          var restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
          this.navCtrl.push(Order,{order: order, restaurants: restaurants});
      }

  }
