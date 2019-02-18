import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GardenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-garden',
  templateUrl: 'garden.html',
})
export class GardenPage {
  socket:any;
  relaisItems:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = navParams.get('socket');
    this.processRelaisItems(navParams.get('relaisItems'));
    this.socket.on("relaisStats", (stats) => {
          var items  = JSON.parse(stats)
          this.relaisItems =  items.filter(function(item) {
            return item.gr == "Tuin";
          });
          
      });  
  }

  processRelaisItems(items){
    var app=this;
     items  = JSON.parse(items)
         app.relaisItems =  items.filter(function(item) {
           return item.gr == "Tuin";
         });
         
   }

  toggleRelaisItem(item){
    //item.status = (item.status == 0 ? 1:0);
    console.log('ID: ' + item.id);
    this.socket.emit('toggleItem',item.id);
    item.status=!item.status;
    
  }

  navBack(): void {
    //this.navCtrl.push(HomePage);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GardenPage');
  }

}
