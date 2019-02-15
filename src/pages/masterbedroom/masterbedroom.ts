import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MasterbedroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-masterbedroom',
  templateUrl: 'masterbedroom.html',
})
export class MasterbedroomPage {

  socket:any;
  relaisItems:any;
  dimItems:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = navParams.get('socket');
    this.socket.emit('getScenes');
    this.socket.on ('scenes',(data) => {
      console.log('HERE IS THE SHIT!! : ' + data );  
    });
    this.socket.on("relaisStats", (stats) => {
          var items  = JSON.parse(stats)
          this.relaisItems =  items.filter(function(item) {
            return item.gr == "Master Bedroom";
          });
          
      });  
    this.socket.on("dimStats", (stats) => {
        var items  = JSON.parse(stats)
        this.dimItems =  items.filter(function(item) {
          return item.gr == "Master Bedroom";
        });
        
    });  
  }

  toggleRelaisItem(item){
    //item.status = (item.status == 0 ? 1:0);
    console.log('ID: ' + item.id);
    this.socket.emit('toggleItem',item.id);
    console.log('emmitting');
  }

  toggleDimItem(item){
    //item.status = (item.status == 0 ? 1:0);
    console.log('ID: ' + item.id);
    this.socket.emit('toggleDimItem',item.id);
    console.log('emmitting');
  }

  navBack(): void {
    //this.navCtrl.push(HomePage);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LivingPage');
  }

}
