import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HeatingPage } from '../pages/heating/heating';
import { LivingPage } from '../pages/living/living';
import { GardenPage } from '../pages/garden/garden';
import { MasterbedroomPage } from '../pages/masterbedroom/masterbedroom';
import { AtticPage } from '../pages/attic/attic';



import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';

import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage'; 



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HeatingPage,
    LivingPage,
    GardenPage,
    MasterbedroomPage,
    AtticPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HeatingPage,
    LivingPage,
    GardenPage,
    MasterbedroomPage,
    AtticPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Camera, 
    FileTransfer, 
    NativeStorage,
    WordpressService,
    AuthenticationService,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
