import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivingPage } from './living';

@NgModule({
  declarations: [
    LivingPage,
  ],
  imports: [
    IonicPageModule.forChild(LivingPage),
  ],
})
export class LivingPageModule {}
