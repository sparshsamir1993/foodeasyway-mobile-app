import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { GoogleMapsLatLng } from 'ionic-native';
import { Geolocation } from '@ionic-native/geolocation';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
declare var $: any;
declare var google: any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  map: GoogleMap;
  lat: any;
  lng: any;
    // country: any;
    // postalcode: any;
    // administrativeArea : any;
    // subAdministrativeArea: any;
    // locality: any;
    // subLocality :any;
    // thoroughfare: any;
    // subthoroughfare: any;
  myAddress: any;
  placesObj: any;
  places: any;
  placesToFilter: any;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geolocation: Geolocation, public appy: ApplicationService) { }
  ionViewDidEnter(){
  	this.loadMap();
  }
   loadMap() {

      this.geolocation.getCurrentPosition({ maximumAge: 30000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
        console.log(this.lat+", "+this.lng);
        
          var point = {lat: this.lat, lng: this.lng};
          let divMap = (<HTMLInputElement>document.getElementById('map_canvas'));
          this.map = new google.maps.Map(divMap, {
          center: point,
          zoom: 15,
          disableDefaultUI: true,
          draggable: false,
          zoomControl: true
          });
          var marker = new google.maps.Marker({
            position: point,
            map: this.map
          });     
          this.appy.getAddrs(this.lat, this.lng).then((data)=>{
            this.myAddress = data['formatted_address'];
          });
          this.getPLacesArray();
    });
  }
  getPLacesArray(){
          this.appy.getPlaces(this.lat, this.lng, this.map).then((data)=>{
            var a = [];
            this.placesObj = data;
            this.placesObj.forEach(function(x){
              a.push(x['formatted_address']);
            });
            this.places = a;
           console.log(this.places);
          });
  }
  setPlacesToFilter(){
    this.placesToFilter = this.places;
  }
  getPoi(e){
         this.setPlacesToFilter();
         let val = e.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.placesToFilter = this.placesToFilter.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      }
  onCancel(){
    $(".placesCard").hide();
  }
}