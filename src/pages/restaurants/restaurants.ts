import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';
import { AuthService } from '../../providers/auth-service';
import { RestaurantItems } from '../restaurant-items/restaurant-items';
/**
 * Generated class for the Restaurants page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
  providers: [ApplicationService, AuthService]
})
export class RestaurantsPage {
    restaurants;
    baseUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService, public auth: AuthService) {

      setInterval(function(){
          appy.setHeaders();
          appy.getRestaurants().then((data)=>{

          console.log(data);
          this.restaurants = data;
      });
  },25000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Restaurants');
    this.appy.setHeaders();
    this.showList();
    this.baseUrl = "https://grubvibe.herokuapp.com";
    this.auth.loadUserCredentials();
    console.log(window.localStorage.getItem('token'));
    if(this.auth.isLoggedin){
        console.log('he is bro');
    }

  }
  showList(){
      this.appy.getRestaurants().then((data)=>{
          console.log(data);
          this.restaurants = data;

      })
      .catch((err)=>{
          console.log(err);
      });
  }

  showRestaurant(rest){
      var order = JSON.parse(window.localStorage.getItem('order'));
      this.navCtrl.push(RestaurantItems,{items:rest.items, order_items: rest.order_items});
  }

}
