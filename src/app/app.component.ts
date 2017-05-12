import { Component, ViewChild  } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs'
import { AuthService } from '../providers/auth-service'
import { OAuthModule } from '../pages/oauth/oauth.module';
@Component({
  templateUrl: 'app.html',
  providers: [AuthService, Nav]
})
export class MyApp {
  rootPage:any = TabsPage;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public auth: AuthService) {
      this.initializeApp();
  }

      initializeApp(){
          this.platform.ready().then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.

              this.statusBar.styleDefault();
              this.splashScreen.hide();

        });
    }
}
