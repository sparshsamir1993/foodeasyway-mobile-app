import { Component , ViewChild} from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { RestaurantsPage } from '../restaurants/restaurants'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;
  pagesNot: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public auth: AuthService) {
        console.log(window.localStorage.getItem('token'));

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
      }


      openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
      }

      authenticated(){
          if(window.localStorage.getItem('token')){
              return true;
          }
          else{
              return false;
          }
      }

  }
