import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GardenPage } from './garden';

@NgModule({
  declarations: [
    GardenPage,
  ],
  imports: [
    IonicPageModule.forChild(GardenPage),
  ],
})
export class GardenPageModule {}
