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

  inRadius(rest)
  {
      var restLat = rest.lat;
      var restLng = rest.lng;
      var selected_address = JSON.parse(window.localStorage.getItem('selected-address'));
      if(!selected_address)
      {
          var addresses = JSON.parse(window.localStorage.getItem('addresses'));
          selected_address = addresses[0];
      }
      var userLat;
      var userLng;
      if(selected_address)
      {
          userLat = selected_address.lat;
          userLng = selected_address.lng;
      }
      else{
          return "set Address";
      }
      var location = "e";
      if(restLat && restLng && userLat && userLng)
      {
        var origin1 = {lat: restLat, lng: restLng};
        var dest1 = {lat: userLat, lng: userLng};
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [origin1],
            destinations: [dest1],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, function(response, status) {
            console.log(response);
            console.log( response.rows[0].elements[0].distance.text);
            location =  response.rows[0].elements[0].distance.text
          })
      }
      return location;
    
  }


//   calculateAndDisplayRoute(rest) {
//     var restLat = rest.lat;
//     var restLng = rest.lng;
//     var selected_address = JSON.parse(window.localStorage.getItem('selected-address'));
//     if(!selected_address)
//     {
//         var addresses = JSON.parse(window.localStorage.getItem('addresses'));
//         selected_address = addresses[0];
//     }
//     var userLat;
//     var userLng;
//     if(selected_address)
//     {
//         userLat = selected_address.lat;
//         userLng = selected_address.lng;
//     }
//     else{
//         return "set Address";
//     }
//     var location = "e";
//     if(restLat && restLng && userLat && userLng)
//     {
//       var origin1 = {lat: restLat, lng: restLng};
//       var dest1 = {lat: userLat, lng: userLng};

//         this.directionsService.route({
//         origin: origin1,
//         destination: dest1,
//         travelMode: 'DRIVING'
//         }, (response, status) => {
//         if (status === 'OK') {
//             // this.directionsDisplay.setDirections(response);
//             console.log( response.rows[0].elements[0].distance.text);
//             location =  response.rows[0].elements[0].distance.text;
//             return location;
//         } else {
//             window.alert('Directions request failed due to ' + status);
//         }
//         });
//     }
//   }
}
