import { ApplicationService } from './../../providers/application';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {
  }

  ionViewDidLoad() {
    this.getUserAddress();
    console.log('ionViewDidLoad WelcomePage');
  }
  ionViewDidEnter(){
   var restaurants = JSON.parse(window.localStorage.getItem('resteraunts'));
   var restVsDist = JSON.parse(window.localStorage.getItem('restVsDist'));
   console.log(restaurants);
   console.log("from home page");
   console.log(restVsDist);

  }
  getUserAddress()
  {
    var user_id = JSON.parse(window.localStorage.getItem('user'))['id'];
    console.log(user_id);
    if(user_id)
    {
      this.appy.getUserAddress(user_id).then((data)=>{
        console.log(data);
        window.localStorage.setItem('addresses', JSON.stringify(data));
      })
    }
  }


}
