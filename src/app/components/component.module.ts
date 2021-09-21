import {ActivationComponent} from "./activation/activation.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CardsEditComponent} from "./cards/cards-edit/cards-edit.component";
import {CardsCreateComponent} from "./cards/cards-create/cards-create.component";

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
  ],
  declarations: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
  ],
  entryComponents: [
    ActivationComponent,
    CardsEditComponent,
    CardsCreateComponent,
  ]
})
export class ComponentModule {
}
