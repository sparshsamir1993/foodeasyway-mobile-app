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

    restVsDist:any;
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
    this.restaurants = this.navParams.get('restaurants');
    this.restVsDist = this.navParams.get('restVsDist');
    console.log(this.restVsDist);
  }
  ionViewWillEnter(){
    this.appy.setHeaders();
    this.showList();

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Restaurants');
    this.baseUrl = "http://localhost:3000";
    this.auth.loadUserCredentials();
    console.log(window.localStorage.getItem('access-token'));
    if(this.auth.isLoggedin){
        console.log('he is bro');
    }
    
  }

//   getRestVsDist(){
//       let self  = this;
//       if(this.restaurants)
//       {
//         this.appy.getRestDists(this.restaurants).then((data)=>{
//             console.log(data);
//             // self.restVsDist = JSON.parse(JSON.stringify(data));
//             self.restVsDist = JSON.stringify(data);
//           })
    
//       }
//   }
  showList(){
    var self = this;
      this.appy.getRestaurants().then((data)=>{
          console.log(data);
          window.localStorage.setItem('restaurants', JSON.stringify(data));
          self.restaurants = data;
          
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

//   inRadius(rest){
//       console.log(rest);
//       rest.max_distance = 3;
//       var restDist = this.restVsDist[rest.id];
//       console.log(this.restVsDist);
//       if(rest.max_distance < parseFloat(restDist)){
          
//           return true;
//       }
//   }
}
