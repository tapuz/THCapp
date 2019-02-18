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
  lockDimUpdates:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var app = this;
    this.socket = navParams.get('socket');
    this.processDimItems(navParams.get('dimItems'));
    this.processRelaisItems(navParams.get('relaisItems'));

    this.socket.on("relaisStats", (stats) => {
        app.processRelaisItems(stats);
          
      });  
    this.socket.on("dimStats", (stats) => {
        app.processDimItems(stats);
        
    });

    
  }

  

  processRelaisItems(items){
     var app=this;
      items  = JSON.parse(items)
          app.relaisItems =  items.filter(function(item) {
            return item.gr == "Living";
          });
          
    }
  
  processDimItems(items){
   if(this.lockDimUpdates==false){
     console.log('not blocking');
    var app = this;
     items  = JSON.parse(items)
          app.dimItems =  items.filter(function(item) {
            return item.gr == "Living";
         });
    }else{console.log('blocking');}
   }v

  toggleRelaisItem(item){
    //item.status = (item.status == 0 ? 1:0);
    console.log('ID: ' + item.id);
    this.socket.emit('toggleItem',item.id);
    console.log('emmitting');
    item.status=!item.status;
  }

  toggleDimItem(item){
    this.socket.emit('toggleDimItem',item.id);
    if(item.status || item.status > 0){item.status=0}else{item.status=100};
    
  }

  dimItemChange(item){
    console.log('changing!!!');
    this.socket.emit('setDimItem',item);
    if(item.status>0)item.status=true;

  }

  dimItemFocus(){
    console.log('FOCUS');
    this.lockDimUpdates = true;
  }
  dimItemBlur(){
    console.log('BLUR');
    var app = this;
    setTimeout(function(){ app.lockDimUpdates = false; }, 10000);
    
  }

  navBack(): void {
    //this.navCtrl.push(HomePage);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LivingPage');
  }

}
