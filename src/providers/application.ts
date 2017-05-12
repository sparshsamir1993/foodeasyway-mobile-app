import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  constructor(public http: Http, public storage: Storage) {
      this.baseUrl = 'http://localhost:3000/api/v1';
    console.log('Hello Application Provider');
  }

  getRestaurants(){
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve =>{
          this.http.get(this.baseUrl + '/restaurants', {headers: headers}).subscribe(data =>{
              if(data.json()){
                  resolve(data.json());
              }
              else{
              }
          });
      });
  }

}
