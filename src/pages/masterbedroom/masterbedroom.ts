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
    var app = this;
    this.socket = navParams.get('socket');
    this.processDimItems(navParams.get('dimItems'));
    this.processRelaisItems(navParams.get('relaisItems'));
    this.socket.emit('getScenes');
    this.socket.on ('scenes',(data) => {
      console.log('HERE IS THE SHIT!! : ' + data );  
    });
    this.socket.on("relaisStats", (stats) => {
         app.processRelaisItems(stats);
      });  
    this.socket.on("dimStats", (stats) => {
        app.processDimItems(stats);
        
    });  
  }

  processRelaisItems(items){
    console.log('proc relais in living page');
     var app=this;
      items  = JSON.parse(items)
          app.relaisItems =  items.filter(function(item) {
            return item.gr == "Master Bedroom";
          });
          
    }
  
  processDimItems(items){
   
     console.log('not blocking');
    var app = this;
     items  = JSON.parse(items)
          app.dimItems =  items.filter(function(item) {
            return item.gr == "Master Bedroom";
         });
    
  }
  

  toggleRelaisItem(item){
    this.socket.emit('toggleItem',item.id);
    item.status=!item.status;
  }

  toggleDimItem(item){
    this.socket.emit('toggleDimItem',item.id);
    if(item.status || item.status > 0){item.status=0}else{item.status=100};
    
  }

  dimItemChange(item){
    console.log('changing!!!');
    
  }

  dimItemFocus(){
    console.log('FOCUS');
   
  }
  dimItemBlur(item){
    console.log('BLUR');
    this.socket.emit('setDimItem',item);
    if(item.status>0)item.status=true;
   
    //setTimeout(function(){ app.lockDimUpdates = false; }, 10000);
    
  }





  navBack(): void {
    //this.navCtrl.push(HomePage);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LivingPage');
  }

}
