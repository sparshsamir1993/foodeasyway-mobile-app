import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

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

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  map: GoogleMap;
  lat: any;
  lng: any;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geolocation: Geolocation) { }

  ionViewDidLoad(){
  	this.loadMap();
  }
   loadMap() {

      this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
        console.log(this.lat+", "+this.lng);
        let location = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: this.lat,
              lng: this.lng
            },
            zoom: 18
          }
        };

        this.map = this.googleMaps.create('map_canvas', mapOptions);

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          console.log('Map is ready!');
          this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: this.lat,
              lng: this.lng
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
        });
      }).catch((error) => {
        console.log('Error getting location', error);
    });
}

}
