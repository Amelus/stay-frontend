import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppointmentSelectionPage} from './appointment-selection.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentSelectionPageRoutingModule {
}
