import {ActivationComponent} from "./activation/activation.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CardsEditComponent} from "./cards/cards-edit/cards-edit.component";
import {CardsCreateComponent} from "./cards/cards-create/cards-create.component";
import {AppointmentSelectionComponent} from "./appointment/appointment-selection/appointment-selection.component";
import {DatePickerModule} from "ionic4-date-picker";
import {MeetingCreationComponent} from "./meeting/meeting-creation/meeting-creation.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    DatePickerModule
  ],
  exports: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    AppointmentSelectionComponent,
    MeetingCreationComponent
  ],
  declarations: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    AppointmentSelectionComponent,
    MeetingCreationComponent
  ],
  entryComponents: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    AppointmentSelectionComponent,
    MeetingCreationComponent
  ]
})
export class ComponentModule {
}
