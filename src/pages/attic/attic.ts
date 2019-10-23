import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AtticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attic',
  templateUrl: 'attic.html',
  
})
export class AtticPage {
  socket:any;
  relaisItems:any;
  dimItems:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    var app = this;
    this.socket = navParams.get('socket');
    
    this.processRelaisItems(navParams.get('relaisItems'));
    this.socket.emit('getStats');

    this.socket.on("relaisStats", (stats) => {
         app.processRelaisItems(stats);
          
       });  
     
  }

  processRelaisItems(items){
    console.log('proc relais in attic page');
     var app=this;
      items  = JSON.parse(items)
          app.relaisItems =  items.filter(function(item) {
            return item.gr == "Zolder";
          });
          
    }

    toggleRelaisItem(item){
      //item.status = (item.status == 0 ? 1:0);
      console.log('ID: ' + item.id);
      this.socket.emit('toggleItem',item.id);
      console.log('emmitting..');
      item.status=!item.status;
      
    }

    navBack() {
      //this.navCtrl.push(HomePage);
      this.navCtrl.pop();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtticPage');
  }

}
