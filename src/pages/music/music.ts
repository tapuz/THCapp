import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class MusicPage {
  socket:any;
  yamaha_status:any;
  volume:any;
  input:any='Connecting...';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var app=this;
    this.socket = navParams.get('socket');
    this.socket.on("yamaha_status", (status) => {
      this.yamaha_status=status;
      console.log("STATUS IS " + status);
    });
    this.socket.on("yamaha_volume", (volume) => {
      this.volume=volume;
      
    });
    this.socket.on("yamaha_input", (yamaha_input) => {
      this.input=yamaha_input;
      
    });

    setInterval(function(){ app.yamaha('input'); }, 5000);
    setInterval(function(){ app.yamaha('status'); }, 5000);
    setInterval(function(){ app.yamaha('volume'); }, 4000);
    
  }

  yamaha(task) {
    this.socket.emit('yamaha',task);
  }

  navBack() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPage');
  }

}
