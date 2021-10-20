import {ActivationComponent} from "./activation/activation.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CardsEditComponent} from "./cards/cards-edit/cards-edit.component";
import {CardsCreateComponent} from "./cards/cards-create/cards-create.component";
import {ManagementEditComponent} from "./management/management-edit/management-edit.component";
import {ManagementCreateComponent} from "./management/management-create/management-create.component";
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
    ManagementEditComponent,
    ManagementCreateComponent,
    AppointmentSelectionComponent,
    MeetingCreationComponent
  ],
  declarations: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    ManagementEditComponent,
    ManagementCreateComponent,
    AppointmentSelectionComponent,
    MeetingCreationComponent
  ],
  entryComponents: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    ManagementEditComponent,
    ManagementCreateComponent,
    AppointmentSelectionComponent,
    MeetingCreationComponent
  ]
})
export class ComponentModule {
}
