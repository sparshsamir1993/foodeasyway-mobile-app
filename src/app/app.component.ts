import { HomePage } from './../pages/home/home';

import { LogoutPage } from './../pages/logout/logout';
import { PreviousOrdersPage } from './../pages/previous-orders/previous-orders';
import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs'
import { AuthService } from '../providers/auth-service'
import { OAuthModule } from '../pages/oauth/oauth.module';
import { NavbarPage } from '../pages/navbar/navbar';
import { WelcomePage } from '../pages/welcome/welcome';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { AddressesPage } from '../pages/addresses/addresses';

@Component({
  templateUrl: 'app.html',
  providers: [AuthService, Nav]
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  pages;
  pagesNot;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public auth: AuthService) {
      this.initializeApp();
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Restaurants', component: RestaurantsPage},
        { title : 'Order History', component: PreviousOrdersPage},
        { title: 'Addresses', component: AddressesPage},
        { title: 'Logout', component: LogoutPage}
        
      ];
      this.pagesNot = [
        { title: 'Login', component: LoginPage },
        { title: 'Home', component: HomePage }
      ];
    }

      initializeApp(){
          this.platform.ready().then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.

              this.statusBar.styleDefault();
              this.splashScreen.hide();

        });
    }
    authenticated(){
        if(window.localStorage.getItem('user')){
            return true;
        }
        else{
            return false;
        }
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
      }
}
