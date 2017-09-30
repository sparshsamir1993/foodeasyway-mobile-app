import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth-service'
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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
      console.log(JSON.parse(window.localStorage.getItem('order')));
      console.log(JSON.parse(window.localStorage.getItem('user')));
      var order =JSON.parse(window.localStorage.getItem('order'));
      var order_items =JSON.parse(window.localStorage.getItem('order-items'));
      var user =JSON.parse(window.localStorage.getItem('user'));
      if(order != undefined){
          if(order){
            var order_id = order.id;
          }
          else if(order_items){
            var order_id = order_items[0].order_id;
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
                        order_id: order_items[0].order_id,
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
          var headers = new Headers();
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
      if(window.localStorage.getItem('order-items')){
        var order_id = JSON.parse(window.localStorage.getItem('order-items'))[0].order_id;  
      }else{
        var order_id = JSON.parse(window.localStorage.getItem('order')).id;  
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
}

