import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HeatingPage } from '../heating/heating';

import io from 'socket.io-client';
import * as Config from '../../config';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {
  socket:any;
  temp:any;

  constructor(
    public navCtrl: NavController, 
    )
    {
      this.socket = io(Config.THCServer);
      this.socket.on("temp", (temp) => {
          this.temp=temp;
      });  


    }

  navToHeating(): void {
    this.navCtrl.push(HeatingPage);
  }

 
  
  

 

}
