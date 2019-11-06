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
  lightItems:any;
  sprinklerItems:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = navParams.get('socket');
    this.processRelaisItems(navParams.get('relaisItems'));

    this.socket.on("relaisStats", (stats) => {
          this.processRelaisItems(stats);
          
      });  
  }

  processRelaisItems(items){
    var app=this;
     this.lightItems= this.sprinklerItems = JSON.parse(items)
         app.lightItems =  app.lightItems.filter(function(item) {
           return item.gr == "Tuin";
         });
         app.sprinklerItems =  app.sprinklerItems.filter(function(item) {
           return item.gr == "Bewatering";
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
