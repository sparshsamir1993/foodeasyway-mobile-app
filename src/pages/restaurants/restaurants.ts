import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';
import { AuthService } from '../../providers/auth-service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService, public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Restaurants');
    this.appy.setHeaders();
    this.showList();
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
      });
  }

}
