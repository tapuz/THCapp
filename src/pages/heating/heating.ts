import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HeatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-heating',
  templateUrl: 'heating.html',
})
export class HeatingPage {
  socket:any;
  heatingItems:any;
  temp:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = navParams.get('socket');
    this.temp = navParams.get('temp');
    this.socket.on("relaisStats", (stats) => {
          var items  = JSON.parse(stats)
          this.heatingItems =  items.filter(function(item) {
            return item.gr == "Verwarming";
          });
          
      });  
      this.socket.on("temp", (temp) => {
         this.temp=temp;
       });  
  }

  

  toggleItem(item){
    //item.status = (item.status == 0 ? 1:0);
    console.log('ID: ' + item.id);
    this.socket.emit('toggleItem',item.id);
    console.log('emmitting');
  }

  navBack(): void {
    //this.navCtrl.push(HomePage);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeatingPage');
  }

}
