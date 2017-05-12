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

    constructor(public http: Http, public storage: Storage) {
        this.http = http;
        this.storage = storage;
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    storeUserCredentials(token) {
        window.localStorage.setItem('token',token);
        console.log(token);
        this.useCredentials(token);

    }
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
        console.log(this.AuthToken);
    }

    loadUserCredentials() {
        var token = window.localStorage.getItem('token');
        console.log(token);
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.removeItem('token');

    }

    authenticate(user) {
        var creds = "email=" + user.email + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post('http://localhost:3000/api/v1/auth/sign_in', creds, {headers: headers}).subscribe(data => {
                if(data.json()){
                    console.log(data.json().data.authentication_token);
                    this.storeUserCredentials(data.json().data.authentication_token);
                    resolve(data.json().data.authentication_token);
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
            this.http.post('http://localhost:3333/addUser', creds, {headers: headers}).subscribe(data => {
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
