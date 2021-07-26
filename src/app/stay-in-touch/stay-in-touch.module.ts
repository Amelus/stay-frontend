// @ts-ignore
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StayInTouchPageRoutingModule} from './stay-in-touch-routing.module';

import {StayInTouchPage} from './stay-in-touch.page';
import {DatePickerModule} from "ionic4-date-picker";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StayInTouchPageRoutingModule,
    DatePickerModule
  ],
  declarations: [StayInTouchPage]
})
export class StayInTouchPageModule {}
