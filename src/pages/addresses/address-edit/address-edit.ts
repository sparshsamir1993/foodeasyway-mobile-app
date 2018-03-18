import { ApplicationService } from './../../../providers/application';
import { Component , ViewChild} from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Nav,Platform } from 'ionic-angular';
import { AuthService } from "../../../providers/auth-service";
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GoogleMapsLatLng } from 'ionic-native';
import { Geolocation } from '@ionic-native/geolocation';

declare var $: any;
declare var google: any;
@Component({
  selector: 'address-edit',
  templateUrl: 'address-edit.html',
  providers: [AuthService]
})

export class AddressEditPage {
    oldaddress: any;
    map: any;
    lat: any;
    lng: any;
    marker: any;
    place_id: any;
    landmark: any;
    placesObj: any;
    places: any;
    placesToFilter: any;
    fullAddress: any;
    street: any;
    name: any;
    constructor(public navCtrl: NavController, public navparams: NavParams, public loadingCtrl: LoadingController, private geolocation: Geolocation, public appy: ApplicationService ){
        this.oldaddress = navparams.get('oldAddress');
    }
    ionViewWillEnter(){
    this.loadMap();
     this.oldaddress = this.navparams.get('oldAddress');
     console.log(this.oldaddress);
    }

    loadMap() {
        let loader = this.loadingCtrl.create({
          content: "Locating You..."
        });
        loader.present();
        this.geolocation.getCurrentPosition({ maximumAge: 30000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
            // this.lat = resp.coords.latitude
            // this.lng = resp.coords.longitude
            this.lat = this.oldaddress['lat'];
            this.lng = this.oldaddress['lng'];
            var autocomplete: any;
            
            console.log(this.lat+", "+this.lng);
            
              var point = {lat: this.lat, lng: this.lng};
              let divMap = (<HTMLInputElement>document.getElementById('map_canvas'));
              this.map = new google.maps.Map(divMap, {
              center: point,
              zoom: 15,
              disableDefaultUI: true,
              draggable: true,
              zoomControl: true
              });
              loader.dismissAll()
              this.marker = new google.maps.Marker({
                position: point,
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
              });     
              this.appy.getAddrs(this.lat, this.lng).then((data)=>{
                // this.landmark = data['formatted_address'];
              });
              var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(this.lat-2, this.lng-2),
                new google.maps.LatLng(this.lat+2, this.lng+2)
              );
              let mainThis = this;
              this.marker.addListener('click', function() {
                mainThis.map.setZoom(8);
                console.log('clicked');
                mainThis.map.setCenter(mainThis.marker.getPosition());
              });
              
              var input = document.getElementById('pac-input');
              var options = {
                bounds: defaultBounds,
                types: ['geocode']
              };
              
              autocomplete = new google.maps.places.Autocomplete(input, options);
              var infowindow = new google.maps.InfoWindow();
              var infowindowContent = document.getElementById('infowindow-content');
              infowindow.setContent(infowindowContent);
              this.marker.addListener('click', function() {
                infowindow.open(this.map, this.marker);
              });
             
              var tempMap = this.map;
              
              // this.marker.addListener('click', function(){
              //   if (mainThis.marker.getAnimation() !== null) {
              //     mainThis.marker.setAnimation(null);
              //   } else {
              //     mainThis.marker.setAnimation(google.maps.Animation.DROP);
              //   }
              // });
              console.log(mainThis.marker.getPosition());
              var tempLand = this.landmark;
              
              google.maps.event.addListener(mainThis.marker, 'dragend', function(data){
                
                var position =  mainThis.marker.getPosition();
                this.lat = position.lat();
                this.lng = position.lng();
                var latlng = {lat: this.lat, lng: this.lng};
                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({'location': latlng}, function(results, status) {
                  console.log(results);
                  mainThis.landmark = results[0]['formatted_address'];
                  mainThis.setLandmark(true);
                  mainThis.setFullAdddress();
    
                });
              });
              
              autocomplete.addListener('place_changed', function() {
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                  return;
                }
                if (mainThis.marker.getAnimation() !== null) {
                  mainThis.marker.setAnimation(null);
                } else {
                  mainThis.marker.setAnimation(google.maps.Animation.DROP);
                }
                if (place.geometry.viewport) {
                  tempMap.fitBounds(place.geometry.viewport);
                } else {
                  tempMap.setCenter(place.geometry.location);
                  tempMap.setZoom(17);
                }
      
                // Set the position of the this.marker using the place ID and location.
                mainThis.marker.setPosition(place.geometry.location);
                mainThis.marker.setVisible(true);
      
                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-id'].textContent = place.place_id;
                infowindowContent.children['place-address'].textContent =
                    place.formatted_address;
                infowindow.open(this.map, this.marker);
              });
              this.map = tempMap;
              this.marker = mainThis.marker;
              $("#pac-input").show();
              
        });
      }
      setFullAdddress(){
        this.fullAddress = this.street +" " + this.landmark;
        console.log(this.fullAddress);
      }
      setLandmark(check){
        if(check){
          this.landmark;
        }
        else
        {
          if($("#pac-input").val().length>0)
          {
            this.landmark = $("#pac-input").val();
          }
          else
          {
            this.landmark;
          }
    
        }
    }   
}