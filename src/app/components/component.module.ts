import {ActivationComponent} from "./activation/activation.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ActivationComponent
  ],
  declarations: [ActivationComponent],
  entryComponents: [ActivationComponent]
})
export class ComponentModule {
}
