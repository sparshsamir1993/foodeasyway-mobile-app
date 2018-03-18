import { HomePage } from './../home/home';
import { AddressEditPage } from './address-edit/address-edit';
import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApplicationService } from '../../providers/application';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AddressesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addresses',
  templateUrl: 'addresses.html',
})
export class AddressesPage {
  fullAddress: any;
  name: any;
  lat: any;
  lng: any;
  fromNewAddress: any;
  user_id: any;
  addresses: any;
  address: any;
  selectedAddress: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public appy: ApplicationService) {
    this.fullAddress = navParams.get('full_adrress');
    this.name = navParams.get('name');
    this.lat = navParams.get('lat');
    this.lng = navParams.get('lng');
    console.log(this.lat, this.lng);
    this.addressPresent();    
    this.fromNewAddress = navParams.get('fromNewAddress')? navParams.get('fromNewAddress'): false;
    this.user_id = JSON.parse(window.localStorage.getItem('user'))['id'];
    this.fromNewAddress = this.navParams.get('fromNewAddress')? this.navParams.get('fromNewAddress'): false;
    var selAdd = JSON.parse(window.localStorage.getItem('selected-address'));
    this.addresses = JSON.parse(window.localStorage.getItem('addresses'));
    this.selectedAddress = selAdd ? selAdd : this.addresses[0];
  }

  ionViewDidEnter() {
    
    console.log('ionViewDidLoad AddressesPage');
    
  }
  selectAddress(address){
    this.selectedAddress = address;
    window.localStorage.setItem('selected-address', JSON.stringify(this.selectedAddress));
  }
  isSelectedAddress(address){
    if(this.selectedAddress && (address.id == this.selectedAddress['id'])){
      return true;
    }
    else{
      return false;
    }
  }

  toNewAddress(){
    this.navCtrl.push(AboutPage);
  }
  saveAddressAlert()
  {
    let alert = this.alertCtrl.create({
      title: 'Confirm Save?',
      message: 'Do you want to save this address?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save Address',
          handler: () => {
            this.appy.addAddress(this.fullAddress, this.lng, this.lat, this.name, this.user_id).then((data)=>{
              this.navCtrl.setRoot(TabsPage);
            });
          }
        }
      ]
    });
    alert.present();
  }

  getUserAddress()
  {
    var user_id = JSON.parse(window.localStorage.getItem('user'))['id'];
    console.log(user_id);
    if(user_id)
    {
      this.appy.getUserAddress(user_id).then((data)=>{
        console.log(data);
      })
    }
  }

  addressPresent(){
    this.fromNewAddress = this.navParams.get('fromNewAddress')? this.navParams.get('fromNewAddress'): false;
    if(this.fromNewAddress){
      return false;
    }
    this.addresses = JSON.parse(window.localStorage.getItem('addresses'));
    if(this.addresses && this.addresses.length > 0)
    {
      this.addresses = JSON.parse(window.localStorage.getItem('addresses'));
      console.log(this.addresses);
      return true;
    }
    else{
      return false;
    }
  }

  editAddress(address){
    this.navCtrl.push(AddressEditPage, {oldAddress: address});
  }
}
