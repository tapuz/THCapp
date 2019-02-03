import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LivingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-living',
  templateUrl: 'living.html',
})
export class LivingPage {
  socket:any;
  relaisItems:any;
  dimItems:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = navParams.get('socket');
    this.socket.on("relaisStats", (stats) => {
          var items  = JSON.parse(stats)
          this.relaisItems =  items.filter(function(item) {
            return item.gr == "Living";
          });
          
      });  
    this.socket.on("dimStats", (stats) => {
        var items  = JSON.parse(stats)
        this.dimItems =  items.filter(function(item) {
          return item.gr == "Living";
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
