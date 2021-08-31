import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AppointmentSelectionPageRoutingModule} from './appointment-selection-routing.module';

import {AppointmentSelectionPage} from './appointment-selection.page';
import {DatePickerModule} from "ionic4-date-picker";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AppointmentSelectionPageRoutingModule,
        DatePickerModule
    ],
  declarations: [AppointmentSelectionPage]
})
export class AppointmentSelectionPageModule {}
