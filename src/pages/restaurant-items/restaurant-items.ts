import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsPage } from '../restaurants/restaurants';
import { ApplicationService } from '../../providers/application';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the RestaurantItems page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-restaurant-items',
  templateUrl: 'restaurant-items.html',
  providers: [ApplicationService, AuthService]

})
export class RestaurantItems {
    items;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {

      this.items = navParams.get('items');
      console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantItems');

  }

  increaseQuan(item){
      item.quantity++;
      console.log(item.id, item.restaurant_id, item.quantity);
      this.appy.addOrderItems(item.id, item.restaurant_id, item.quantity);
  }
  decreaseQuan(item){
      item.quantity--;
      this.appy.addOrderItems(item.id, item.restaurant_id, item.quantity);

  }

}
