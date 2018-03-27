import { NavbarPage } from './../navbar/navbar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';
import { AuthService } from '../../providers/auth-service';
import { RestaurantItems } from '../restaurant-items/restaurant-items';

declare var $: any;
declare var google;

@IonicPage()
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
  providers: [ApplicationService, AuthService]
})
export class RestaurantsPage {
    restaurants;
    baseUrl;

    restVsDist;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService, public auth: AuthService) {

  //     setInterval(function(){
  //         appy.setHeaders();
  //         appy.getRestaurants().then((data)=>{

  //         console.log(data);
  //         this.restaurants = data;
  //     });
  // },25000);

  }
  ionViewDidEnter(){
    this.getRestVsDist();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Restaurants');
    this.appy.setHeaders();
    this.showList();
    this.baseUrl = "http://localhost:3000";
    this.auth.loadUserCredentials();
    console.log(window.localStorage.getItem('access-token'));
    if(this.auth.isLoggedin){
        console.log('he is bro');
    }
    
  }

  getRestVsDist(){
      let self  = this;
      this.appy.getRestDists(this.restaurants).then((data)=>{
        console.log(data);
        this.restVsDist = data;
      })
  }
  showList(){
      this.appy.getRestaurants().then((data)=>{
          console.log(data);
          window.localStorage.setItem('restaurants', JSON.stringify(data));
          this.restaurants = data;

      })
      .catch((err)=>{
          console.log(err);
      });
  }

  showRestaurant(rest){
      this.navCtrl.push(RestaurantItems,{items:rest.items, order_items: rest.order_items});
  }


  getDistanceFromJson(r)
  {
      var r_id = r.id;
      var distance = this.restVsDist[r_id];
      return distance;
  }

  inRadius(rest){
      var restDist = this.restVsDist[rest.id];
      if(rest.max_distance < parseFloat(restDist)){
          return false;
      }
      else{
          return true;
      }
  }
}
