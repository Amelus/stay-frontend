import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StartPagePage} from './start-page.page';
import {ActivationGuard} from "../auth/activation.guard";

const routes: Routes = [
  {
    path: '',
    component: StartPagePage,
    canActivate: [ActivationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartPagePageRoutingModule {
}
