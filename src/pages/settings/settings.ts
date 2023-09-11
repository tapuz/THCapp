import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
//import { Storage } from '@ionic/storage';
//import { Router } from '@angular/router';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',

})
export class SettingsPage {
  ip:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeStorage: NativeStorage,) {

    
    this.nativeStorage.getItem('ip').then(data => {this.ip = data});
      
    
      
    
  }

  save() {
    
    this.nativeStorage.setItem('ip',this.ip ) ;
  }

  navBack() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
