import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StayInformedPageRoutingModule} from './stay-informed-routing.module';

import {StayInformedPage} from './stay-informed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StayInformedPageRoutingModule
  ],
  declarations: [StayInformedPage]
})
export class StayInformedPageModule {}
