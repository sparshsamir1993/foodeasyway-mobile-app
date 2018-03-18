import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth-service'
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
declare var google: any;
/*
  Generated class for the Application provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApplicationService {
    baseUrl;
    access_token;
    expiry;
    token_type;
    uid;
    client;
    restaurants;

  constructor(public http: Http, public storage: Storage, public auth: AuthService) {
      this.baseUrl = 'http://localhost:3000/api/v1';
      //this.baseUrl = 'https://grubvibes.herokuapp.com/api/vi';
    console.log('Hello Application Provider');
    this.setHeaders();

  }

  getHeaders(data){
      console.log('getting headers');
      if(data.headers.toJSON()['access-token'] != undefined){
          window.localStorage.setItem('access-token', data.headers.toJSON()['access-token'][0]);
          window.localStorage.setItem('expiry',data.headers.toJSON()['expiry'][0]);
          window.localStorage.setItem('client',data.headers.toJSON()['client'][0]);
          window.localStorage.setItem('uid',data.headers.toJSON()['uid'][0]);
          window.localStorage.setItem('token-type',data.headers.toJSON()['token-type'][0]);
          this.setHeaders();

      }

}
  setHeaders(){
      this.access_token = window.localStorage.getItem('access-token');
      this.expiry = window.localStorage.getItem('expiry');
      this.uid = window.localStorage.getItem('uid');
      this.token_type = window.localStorage.getItem('token-type');
      this.client = window.localStorage.getItem('client');
      this.auth.setRefreshTimeout(this.expiry);
  }

  getRestaurants(){
      var headers = new Headers();
      console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('access-token', this.access_token);
      headers.append('expiry', this.expiry);
      headers.append('token-type', this.token_type);
      headers.append('uid', this.uid);
      headers.append('client', this.client);



      return new Promise(resolve =>{
          this.http.get(this.baseUrl + '/restaurants', {headers: headers}).subscribe(data =>{
              if(data){
                  console.log(data);
                  this.restaurants = data.json();
                  if(data.headers.toJSON()['access-token'] != undefined){
                      this.getHeaders(data);
                  }
                  window.localStorage.setItem('restaurants', JSON.stringify(data.json()));
                  console.log(this.restaurants);
                  resolve(data.json());
              }
              else{
              }
          },
          err=>{
              console.log(err);

              if(err.statusText == 'Unauthorized'){
                  this.auth.logout();
              }
          });
      });
  }
  getRestaurantsItems(){
      var rest = window.localStorage.getItem('restaurants');
      return(rest);
  }
  addOrderItems(item_id,restaurant_id,quantity, name){
      console.log(JSON.parse((window.localStorage.getItem('order') && window.localStorage.getItem('order') != "undefined")?window.localStorage.getItem('order'): "{}"));
      console.log(JSON.parse(window.localStorage.getItem('user')));
      var order =JSON.parse((window.localStorage.getItem('order') && window.localStorage.getItem('order') != "undefined")?window.localStorage.getItem('order'): "{}");
      var order_items =JSON.parse((window.localStorage.getItem('order-items') && window.localStorage.getItem('order-items') != "undefined")?window.localStorage.getItem('order-items'): "{}");
      var user =JSON.parse(window.localStorage.getItem('user'));
      if(order_items == null){
          order_items = {};
      }
      if((order != undefined && order != null && order != "undefined") && (order_items.length >0 && order_items != undefined && order_items != "undefined")){
          if(order){
            var order_id = order.order_id;
            if(!order_id){
              order_id = order.id;
            }
          }
          else if(order_items.length > 0){
            order_id = order_items[0].order_id;
          }
            
          var headers = new Headers();
          console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('access-token', this.access_token);
          headers.append('expiry', this.expiry);
          headers.append('token-type', this.token_type);
          headers.append('uid', this.uid);
          headers.append('client', this.client);
          var data = {  restaurant_id: restaurant_id,
                        item_id: item_id,
                        quantity: quantity,
                        order_id: order_id,
                        user_id: user.id,
                        order_restaurant_id: restaurant_id,
                        name: name
                    };
          return new Promise(resolve =>{
              this.http.post(this.baseUrl+'/order_items?&order_id='+order_id+'&restaurant_id='+restaurant_id+'&item_id='+item_id+'&quantity='+quantity+'&user_id='+user.id+'&name='+ name +'&total=0' , {headers: headers}).subscribe(data =>{
                  if(data){
                      console.log(data);
                      window.localStorage.setItem('order', JSON.stringify(data.json().object));
                      if(data.headers.toJSON()['access-token'] != undefined){
                          this.getHeaders(data);
                      }
                      this.getOrderItems();
                      resolve(data.json());
                  }
                  else{

                  }
              });

          });
        }
      
      else{
          headers = new Headers();
          console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('access-token', this.access_token);
          headers.append('expiry', this.expiry);
          headers.append('token-type', this.token_type);
          headers.append('uid', this.uid);
          headers.append('client', this.client);

          return new Promise(resolve=>{
             this.http.post(this.baseUrl + '/order_items?restaurant_id='+restaurant_id+'&item_id='+item_id+'&quantity='+quantity+'&user_id='+user.id+'&name='+ name , {headers: headers}).subscribe(data=>{
                 if(data){
                     console.log(data);
                     window.localStorage.setItem('order', JSON.stringify(data.json().object));
                     if(data.headers.toJSON()['access-token'] != undefined){
                         this.getHeaders(data);
                     }
                     this.getOrderItems();
                     resolve(data.json());
                 }
                 else{

                 }
             });
          });
      }


  }

  getOrderItems(){
      var headers = new Headers();
      console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('access-token', this.access_token);
      headers.append('expiry', this.expiry);
      headers.append('token-type', this.token_type);
      headers.append('uid', this.uid);
      headers.append('client', this.client);
      if(window.localStorage.getItem('order-items') && JSON.parse(window.localStorage.getItem('order-items')).length > 0){
        var order_id = JSON.parse(window.localStorage.getItem('order-items'))[0].order_id;  
      }else{
        order_id = JSON.parse(window.localStorage.getItem('order')).id;  
      }
      
      return new Promise(resolve=>{
         this.http.get(this.baseUrl + '/order_items/'+ order_id , {headers: headers}).subscribe(data=>{
             if(data){
                 console.log(data);
                 window.localStorage.setItem('order-items', JSON.stringify(data.json()));
                 if(data.headers.toJSON()['access-token'] != undefined){
                     this.getHeaders(data);
                 }
                //  resolve(data.json());
             }
             else{

             }
         });
      });
  }

  destroyOItem(item){
      var headers = new Headers();
      console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('access-token', this.access_token);
      headers.append('expiry', this.expiry);
      headers.append('token-type', this.token_type);
      headers.append('uid', this.uid);
      headers.append('client', this.client);
      var order_id = JSON.parse(window.localStorage.getItem('order')).id;
      var itemId = item.id;
      return new Promise(resolve => {
        this.http.delete(this.baseUrl + '/order_items/' +itemId)
      })

  }

    getAddrs(lat, lng) {
      return new Promise(resolve =>{
          var geocoder= new google.maps.Geocoder();
          geocoder.geocode({'location': {'lat': parseFloat(lat.toFixed(5)), 'lng':parseFloat(lng.toFixed(5))}}, function(results, status) {
              if (status === 'OK') {
                if (results[0]) {

                  console.log(results[0]);
                  resolve(results[0]);
                  // infowindow.open(map, marker);
                } else {
                  window.alert('No results found');
                }
              } else {
                window.alert('Geocoder failed due to: ' + status);
              }
            });        
      });
         
  }

  getUserAddress(user_id){
    var headers = new Headers();
    console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('access-token', this.access_token);
    headers.append('expiry', this.expiry);
    headers.append('token-type', this.token_type);
    headers.append('uid', this.uid);
    headers.append('client', this.client);

    return new Promise(resolve =>{
        this.http.get(this.baseUrl + '/addresses?user_id='+user_id , {headers: headers}).subscribe(data=>{
            resolve(data.json());
        });
    });
  }

  addAddress(full_address, lng, lat, name, user_id){
    var headers = new Headers();
    console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('access-token', this.access_token);
    headers.append('expiry', this.expiry);
    headers.append('token-type', this.token_type);
    headers.append('uid', this.uid);
    headers.append('client', this.client);

    return new Promise(resolve =>{
        this.http.post(this.baseUrl + '/addresses?full_address='+ full_address+'&lng='+lng+'&lat='+lat+'&name='+name+'&user_id='+user_id , {headers: headers}).subscribe(data=>{
            resolve(data);
        });
      });
  }
  getPlaces(lat, lng, map){
    return new Promise(resolve =>{
      var request = {
        location: new google.maps.LatLng(lat, lng),
        radius: '3000',
        type: ['lodging']
      };

      var service = new google.maps.places.PlacesService(map);
      service.textSearch(request, function(results, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          // for (var i = 0; i < results.length; i++) {
          //   var place = results[i];
          //   createMarker(results[i]);
          // }
          resolve(results);
        }        
      });

    });
  }  

  confirmOrder(order_restaurant, grand_total)
  {
    var headers = new Headers();
    console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('access-token', this.access_token);
    headers.append('expiry', this.expiry);
    headers.append('token-type', this.token_type);
    headers.append('uid', this.uid);
    headers.append('client', this.client);

    var order_restaurant_id = order_restaurant.id;
    var order_id = order_restaurant.order_id;
    return new Promise(resolve =>{
        this.http.post(this.baseUrl+'/order_restaurants/'+order_restaurant_id+'/user_order_confirm?grand_total='+grand_total+'&order_restaurant_id='+order_restaurant_id+'&order_id='+order_id , {headers: headers}).subscribe(data =>{
            if(data){
                resolve(data);
            }
            else{

            }
        },
        err=>{
            console.log(err);
    
         
        });
    });
  }
  getOrderStatus(o_r_id){
    var headers = new Headers();
    console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('access-token', this.access_token);
    headers.append('expiry', this.expiry);
    headers.append('token-type', this.token_type);
    headers.append('uid', this.uid);
    headers.append('client', this.client);

    var order_restaurant_id = o_r_id;
    return new Promise(resolve =>{
        this.http.get(this.baseUrl+'/order_restaurants/'+order_restaurant_id, {headers: headers}).subscribe(data =>{
            if(data){
                console.log(data);
                resolve(data.json());
            }
            else{

            }
        },
        err=>{
            console.log(err);
    
            
        });
    });
    
  }
}
