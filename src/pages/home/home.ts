import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HeatingPage } from '../heating/heating';
import { LivingPage } from '../living/living';
import { GardenPage } from '../garden/garden';

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
  relaisItems:any;
  logo:any;
  

  

  constructor(
    public navCtrl: NavController, 
    )
    {

      var app = this;
      //this.tryingToConnect();
      this.socket = io(Config.THCServer);
      this.socket.on("temp", (temp) => {
          this.temp=temp;
      });
      //get the carwash status
      this.socket.on("relaisStats", (stats) => {
        var items  = JSON.parse(stats)
        this.relaisItems =  items.filter(function(item) {
          return item.id == "20";
        });
        this.CarwashBtnOutline = this.relaisItems[0].status;
        
      });
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
      

    }

  navToHeating(): void {
    this.navCtrl.push(HeatingPage,{socket:this.socket,temp:this.temp});
    
  }

  navToLiving(): void {
    this.navCtrl.push(LivingPage,{socket:this.socket});
  }
 
  navToGarden(): void {
    this.navCtrl.push(GardenPage,{socket:this.socket});
  }

  alloff():void {
    this.socket.emit('alloff');
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
    this.socket.emit('toggleItem',20);
    console.log('emmitting');
  }

  
  
  

 

}
