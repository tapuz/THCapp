import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HeatingPage } from '../heating/heating';
import { LivingPage } from '../living/living';
import { GardenPage } from '../garden/garden';
import { MasterbedroomPage } from '../masterbedroom/masterbedroom';
import { AtticPage } from '../attic/attic';
import { SettingsPage } from '../settings/settings';

import io from 'socket.io-client';
import * as Config from '../../config';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {
  socket:any;
  temp:any;
  timer:any;
  timeout:any;
  interval:any;
  buttonColor:any;
  CarwashBtnOutline:boolean=true;
  ParkingBtnOutline:boolean=true;
  relaisItems:any;
  dimItems:any;
  logo:any;
  

  

  constructor(
    public navCtrl: NavController, 
    )
    {
      console.log('constructor Home');
      var app = this;
      this.socket = io(Config.THCServer);
      this.socket.on("temp", (temp) => {
          this.temp=temp;
          
      });
      
      //this.socket.emit("getStats");
      this.socket.on("relaisStats", (stats) => {
        console.log('got rs in home');
        this.relaisItems = stats;
        var items  = JSON.parse(stats)
        var CarwashRelais =  items.filter(function(item) {return item.id == "19";});
        this.CarwashBtnOutline = !CarwashRelais[0].status;

        var ParkingRelais = items.filter(function(item) {return item.id == "8";});
        this.ParkingBtnOutline = !ParkingRelais[0].status;
        
      });

      this.socket.on("dimStats", (stats) => {this.dimItems = stats;
      console.log('got DIM in home');});

      //this.socket.on('statusUpdate',(status)=>{console.log('got the update!!')});

      this.socket.on('connect',function(){
        
        app.logo ='assets/imgs/logo.png';
      });
      this.socket.on('reconnect', (attemptNumber) => {
        app.logo ='assets/imgs/logo.png';
      });
      this.socket.on('disconnect', (reason) => {
        app.logo = 'assets/imgs/logo_red.png';
        
        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
          this.socket.connect();
        }
        // else the socket will automatically try to reconnect
      });
      this.socket.on('error', (error) => {
        app.logo ='assets/imgs/logo_red.png';
      });
    
      this.socket.on('red',()=> {
        console.log('red !!');
      });

    }

  navToHeating(): void {
    this.navCtrl.push(HeatingPage,{socket:this.socket,temp:this.temp,relaisItems:this.relaisItems});
    
  }

  navToMasterBedroom(): void {
    this.navCtrl.push(MasterbedroomPage,{socket:this.socket,relaisItems:this.relaisItems,dimItems:this.dimItems});
    
  }

  navToLiving(): void {
    this.navCtrl.push(LivingPage,{socket:this.socket,relaisItems:this.relaisItems,dimItems:this.dimItems});
  }
 
  navToGarden(): void {
    this.navCtrl.push(GardenPage,{socket:this.socket,relaisItems:this.relaisItems,dimItems:this.dimItems});
  }

  navToAttic(): void {
    this.navCtrl.push(AtticPage,{socket:this.socket,relaisItems:this.relaisItems,});
  }

  navToSettings(): void {
    this.navCtrl.push(SettingsPage,{});
  }

  alloff():void {
    this.socket.emit('alloff');
  }

  comingHome():void {
    this.socket.emit('');
    console.log('home');
  }

  touchAllOffStart(){
    var app = this; //do this to avoid scope problem in timeout function 
    this.buttonColor = 'danger';
    this.timeout=setTimeout(function() {
      console.log('Shutting down the house!!');
      app.alloff();
      clearInterval(app.interval);
      app.buttonColor = 'danger';
    }, 2000);
    this.interval = setInterval(function(){
      if (app.buttonColor == 'danger'){
        app.buttonColor = 'primary';
      } else {
        app.buttonColor = 'danger';
      }
    },100);

  }
  touchAllOffEnd():void {
    console.log('TIMER: '  + this.timeout);
    if(Number.isInteger(this.timeout)){
      clearTimeout(this.timeout);
      clearInterval(this.interval);
      this.buttonColor ='primary';
    }
  }
  
  toggleCarwash(){
    this.socket.emit('toggleItem',19);
    this.CarwashBtnOutline = !this.CarwashBtnOutline;
    
  }

  toggleParking(){
    this.socket.emit('toggleItem',8);
    this.ParkingBtnOutline = !this.ParkingBtnOutline;
    
  }
  
  

  ionViewWillEnter() {
   
    console.log('ionViewWillEnter HomePage');
  }
  
  

 

}
