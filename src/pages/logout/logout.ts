import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
/**
 * Generated class for the Logout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
  }

  logout(){
      console.log('logged out');
      this.auth.logout();
      this.navCtrl.setRoot(HomePage);
  }
}
