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

  constructor(public http: Http, public storage: Storage, public auth: AuthService) {
      this.baseUrl = 'http://localhost:3000/api/v1';
    console.log('Hello Application Provider');
    this.setHeaders();

  }

  getHeaders(data){
      console.log('getting headers');
      if(data.headers.toJSON()['Access-Token'] != undefined){
          window.localStorage.setItem('access-token', data.headers.toJSON()['Access-Token'][0]);
          window.localStorage.setItem('expiry',data.headers.toJSON()['Expiry'][0]);
          window.localStorage.setItem('client',data.headers.toJSON()['Client'][0]);
          window.localStorage.setItem('uid',data.headers.toJSON()['Uid'][0]);
          window.localStorage.setItem('token-type',data.headers.toJSON()['Token-Type'][0]);
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
                  if(data.headers.toJSON()['Access-Token'] != undefined){
                      this.getHeaders(data);
                  }
                  resolve(data.json());
              }
              else{
              }
          });
      });
  }

}
