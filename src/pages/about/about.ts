import { Component, ViewChild } from '@angular/core';
import { NavController , AlertController, LoadingController } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';
import { AddressesPage } from '../addresses/addresses';
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
  
  map: any;
  lat: any;
  lng: any;
  marker: any;
    // country: any;
    // postalcode: any;
    // administrativeArea : any;
    // subAdministrativeArea: any;
    // locality: any;
    // subLocality :any;
    // thoroughfare: any;
    // subthoroughfare: any;
  place_id: any;
  landmark: any;
  placesObj: any;
  places: any;
  placesToFilter: any;
  fullAddress: any;
  street: any;
  name: any;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geolocation: Geolocation, public appy: ApplicationService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) { 
    
  }
  ionViewDidEnter(){
    $(".placesCard").hide();
    $("#pac-input").hide();
   
  }
  ionViewDidLoad(){
    this.loadMap();
  }
  setLandmark(check){
    if(check){
      this.landmark;
    }else{
      if($("#pac-input").val().length>0){
        this.landmark = $("#pac-input").val();
      }else{
        this.landmark;
      }

    }
    
    console.log($("#pac-input").val());
  }

  setFullAdddress(){
    this.fullAddress = this.street +" " + this.landmark;
    console.log(this.fullAddress);
  }

  toAddressPage(){
    var user_id = JSON.parse(window.localStorage.getItem('user'))['id'];
    if(this.street == '' || this.landmark == '' || this.street == undefined || this.landmark == undefined)
    {
      let alert = this.alertCtrl.create({
        title:'Missing',
        subTitle: 'Please provide both the fields',
        buttons:['OK']
      });
      alert.present();
      return;
    }
    else if(!user_id || user_id.length < 1){
      let alert = this.alertCtrl.create({
        title:'Not Logged In',
        subTitle: 'Please Login to save your Address',
        buttons:['OK']
      });
      alert.present();
      return;
    }
    else{
      this.setFullAdddress();
    }
    this.navCtrl.push(AddressesPage,{
      full_adrress: this.fullAddress,
      lat: this.lat,
      lng: this.lng,
      fromNewAddress: true
    });
  }

  reverseGeocode(latlng){
    new google.maps.Geocoder.geocode({'location': latlng}, function(results, status) {
      console.log(results);
    });
  }

  loadMap() {
    let loader = this.loadingCtrl.create({
      content: "Locating You..."
    });
    loader.present();
    this.geolocation.getCurrentPosition({ maximumAge: 30000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
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
            mainThis.lat = position.lat();
            mainThis.lng = position.lng();
            console.log(mainThis.lat, mainThis.lng);
            var latlng = {lat: mainThis.lat, lng: mainThis.lng};
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
            console.log(place);
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
            this.lat = mainThis.marker.getPosition().lat();
            this.lng = mainThis.marker.getPosition().lng();
            console.log(this.lat, this.lng);
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-id'].textContent = place.place_id;
            infowindowContent.children['place-address'].textContent =
                place.formatted_address;
            infowindow.open(this.map, this.marker);
          });
          this.map = tempMap;
          this.marker = mainThis.marker;
          $("#pac-input").show();
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
         if(!$(".placesCard").is(':visible')){
            $(".placesCard").show();           
         }
         this.setPlacesToFilter();
         let val = e.target.value;
         if(val != undefined){
           if(val.length == 0){
             $(".placesCard").hide();
             }
            // if the value is an empty string don't filter the items
            if (val && val.trim() != '') {
              this.placesToFilter = this.placesToFilter.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }

         }
         else{
           console.log(e);
         }
      }
  onCancel(){
    $(".placesCard").hide();
  }

  selectPlace(item){
    // console.log(item);
    $("#pac-input input").val(item);
    this.landmark = item;
    $(".placesCard").hide();
  }
}