import { AboutPage } from './../about/about';
import { TabsPage } from './../tabs/tabs';
import { PreviousOrdersPage } from './../previous-orders/previous-orders';
import { AddressesPage } from './../addresses/addresses';
import { Component , ViewChild} from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { ApplicationService } from "../../providers/application";
import { NavbarPage } from '../pages/navbar/navbar';
import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { RestaurantsPage } from '../restaurants/restaurants';
import { Order } from '../order/order';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApplicationService, AuthService]

})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  order;
  restaurants;
  order_items;
  rootpagel;
  restVsDist;
  rootPage;
  pages: Array<{title: string, component: any}>;
  pagesNot: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public auth: AuthService, public appy: ApplicationService, public alertCtrl: AlertController) {
        console.log(window.localStorage.getItem('access-token'));
        try{
          this.order = JSON.parse(window.localStorage.getItem('order'));          
        }catch(e){
          this.order ="";
        }
        this.rootPage = TabsPage;
        console.log(this.restaurants);
        this.ifOrder(this.order);
        this.pages = [
                  { title: 'Home', component: HomePage },
                  { title: 'Restaurants', component: RestaurantsPage},
                  { title : 'Order History', component: PreviousOrdersPage},
                  { title: 'Saved Addresses', component: AddressesPage},
                  { title: 'Logout', component: LogoutPage}
                  
                ];
        this.pagesNot = [
                  { title: 'Login', component: LoginPage },
                  { title: 'Home', component: HomePage }
                ];
  }

      ionViewWillEnter() {
        console.log('ionViewDidLoad Home');
        this.ifOrder(this.order);
        
        if(JSON.parse(window.localStorage.getItem('user')))
        {
            this.getUserAddress();
            this.getRestaurantsList();
        }

      }

      ifOrder(order){
          if(order){
              var order_id = this.order.id;
              var sum =0;
              this.appy.getRestaurants().then((data)=>{
                  console.log(data[0]);
                //   data.forEach(function(x){console.log(x)})
                for(var x in data){
                    console.log(data[x].name);
                    var items = data[x].order_items;
                    for(var item in items){
                        if(items[item].order_id == order_id){
                            sum++;
                        }
                    }
                }
                console.log(sum);
                this.order_items = sum;
              })
          }
      }

    getRestaurantsList(){
        var self = this;
        var distJson = {};
        this.appy.getRestaurants().then((data)=>{
            console.log(data);
            window.localStorage.setItem('restaurants', JSON.stringify(data));
            self.restaurants = data;
            var selAddress = JSON.parse(window.localStorage.getItem('selected-address'));
            if(!selAddress){
                var addresses = JSON.parse(window.localStorage.getItem('address'))
                if(!addresses || Object.keys(addresses).length==0){
                    this.restVsDist = null;
                    return true;
                }
                selAddress = addresses[0];
            }
            var selAddLat  = selAddress.lat;
            var selAddLng = selAddress.lng;
            self.restaurants.map(function(x){
                if(selAddress)
                {
                    var dest1 = {lat: selAddLat, lng: selAddLng};
                    
                    var origin1 = {lat: x.lat, lng: x.lng};
                    
                    var R = 6371; // Radius of the earth in km
                    var dLat = self.deg2rad(dest1.lat-origin1.lat);  // self.deg2rad below
                    var dLon = self.deg2rad(dest1.lng-origin1.lng); 
                    var a = 
                      Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(self.deg2rad(origin1.lat)) * Math.cos(self.deg2rad(dest1.lat)) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2)
                      ; 
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                    var d = R * c; // Distance in km
                    distJson[x.id] = d.toFixed(2);
                    if(x.lat == null || x.lng ==null || x.lat == undefined || x.lng == undefined){
                        distJson[x.id] =null;
                    }
                }
    
            })
            this.restVsDist = distJson;
            console.log(this.restVsDist);
            window.localStorage.setItem('restVsDist', JSON.stringify(this.restVsDist));
        })
        .catch((err)=>{
            console.log(err);
        });
  
      }
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }
      openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(page.component);
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
            if(!JSON.parse(window.localStorage.getItem('selected-address')) || JSON.parse(window.localStorage.getItem('selected-address')).length ==0)
            {
                var address= JSON.parse(window.localStorage.getItem('addresses'));
                if(address && address.length >0)
                {
                    address = address[0];
                }
                else{
                    window.localStorage.removeItem('selected-address');
                    window.localStorage.removeItem('addresses');
                }
                if(address)
                {
                    window.localStorage.setItem('selected-address', JSON.stringify(address));                    
                }

            }
          })
        }
      }
      authenticated(){
          if(window.localStorage.getItem('user')){
              return true;
          }
          else{
              return false;
          }
      }
      orderPresent(){
          var order = JSON.parse(window.localStorage.getItem('order'));
          if(order){
              return true;
          }
          else{
              return false;
          }
      }
      seeOrder(){
          var order = JSON.parse(window.localStorage.getItem('order'));
          var order_items = JSON.parse(window.localStorage.getItem('order-items'));
          console.log(order);
          console.log(order_items);
          this.navCtrl.push(Order,{orderId: order.id, orderItems: order_items});
      }

      toRestaurantPage(){
          var addresses = JSON.parse(window.localStorage.getItem('addresses'));
          var selectedAddress = JSON.parse(window.localStorage.getItem('selected-address'));
          if((!addresses || !selectedAddress) || (addresses.length == 0 || selectedAddress.length == 0))
          {
            let alert = this.alertCtrl.create({
                title: 'Where to deliver?',
                message: 'Sorry, We couldn\'t find a delivery address',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                      return;
                    }
                  },
                  {
                    text: 'Save an address',
                    handler: () => {
                        this.navCtrl.push(AboutPage);
                    }
                  }
                ]
              });
              alert.present();
          }
          else{
            this.navCtrl.push(RestaurantsPage, {
                restaurants: JSON.parse(window.localStorage.getItem('restaurants')),
                restVsDist: JSON.parse(window.localStorage.getItem('restVsDist'))
              });
  
          }
      }
  }
