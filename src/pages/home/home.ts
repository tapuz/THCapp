import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PictureproofPage } from '../pictureproof/pictureproof';
import { DocscanPage } from '../docscan/docscan';
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

  navToPictureProof(): void {
    this.navCtrl.push(PictureproofPage);
  }

  navToDocScan(): void {
    this.navCtrl.push(DocscanPage);
  }
  
  

 

}
