import { NgModule, ErrorHandler } from '@angular/core';
import { AuthService } from "../providers/auth-service"
import { ApplicationService } from "../providers/application"
import { IonicImageLoader } from 'ionic-image-loader';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { RestaurantItems } from '../pages/restaurant-items/restaurant-items';

import { User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    LogoutPage,
    RestaurantsPage,
    RestaurantItems
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    LogoutPage,
    RestaurantsPage,
    RestaurantItems


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ApplicationService
  ]
})
export class AppModule {}
