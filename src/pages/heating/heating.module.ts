import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeatingPage } from './heating';

@NgModule({
  declarations: [
    HeatingPage,
  ],
  imports: [
    IonicPageModule.forChild(HeatingPage),
  ],
})
export class HeatingPageModule {}
