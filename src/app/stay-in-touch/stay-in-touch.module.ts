import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StayInTouchPageRoutingModule } from './stay-in-touch-routing.module';

import { StayInTouchPage } from './stay-in-touch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StayInTouchPageRoutingModule
  ],
  declarations: [StayInTouchPage]
})
export class StayInTouchPageModule {}
