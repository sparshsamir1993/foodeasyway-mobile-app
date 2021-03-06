import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Component , ViewChild} from '@angular/core';
import { User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Nav,Platform } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {
    @ViewChild(Nav) nav: Nav;
    isLoggedin: boolean;
    AuthToken;
    access_token;
    expiry;
    token_type;
    uid;
    client;
    baseUrl;

    constructor(public http: Http, public storage: Storage) {
        this.http = http;
        this.storage = storage;
        this.isLoggedin = false;
        this.AuthToken = null;
        this.access_token = undefined;
        this.expiry = undefined;
        this.token_type = undefined;
        this.uid = undefined;
        this.client = undefined;
        this.baseUrl = "http://localhost:3000/api/v1";
        //this.baseUrl = "https://grubvibes.herokuapp.com/api/v1";

    }

    storeUserCredentials(user) {
        window.localStorage.setItem('user',JSON.stringify(user));
        console.log(user);
        this.useCredentials(user);

    }
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
        console.log(this.AuthToken);
    }

    loadUserCredentials() {
        var token = window.localStorage.getItem('user');
        console.log(token);
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('order');


    }

    authenticate(user) {
        var creds = "email=" + user.email + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post(this.baseUrl +'/auth/sign_in', creds, {headers: headers}).subscribe(data => {
                console.log(data);
                if(data){
                    window.localStorage.setItem('access-token', data.headers.toJSON()['access-token'][0]);
                    window.localStorage.setItem('expiry',data.headers.toJSON()['expiry'][0]);
                    window.localStorage.setItem('client',data.headers.toJSON()['client'][0]);
                    window.localStorage.setItem('uid',data.headers.toJSON()['uid'][0]);
                    window.localStorage.setItem('token-type',data.headers.toJSON()['token-type'][0]);
                    console.log(this.access_token);
                    this.storeUserCredentials(data.json().data);
                    resolve(this.access_token);
                }
                else
                    resolve(false);
            });
        });
    }
    addUser(user) {
        var creds = "email=" + user.name + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post(this.baseUrl + '/addUser', creds, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }

    getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log(this.AuthToken);
            headers.append('Authorization', 'Bearer ' +this.AuthToken);
            this.http.get('http://localhost:3333/getinfo', {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }

    logout() {
        this.destroyUserCredentials();
    }
}
