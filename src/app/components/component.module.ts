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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    ManagementEditComponent,
    ManagementCreateComponent,
  ],
  declarations: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    ManagementEditComponent,
    ManagementCreateComponent,
  ],
  entryComponents: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
    ManagementEditComponent,
    ManagementCreateComponent,
  ]
})
export class ComponentModule {
}
