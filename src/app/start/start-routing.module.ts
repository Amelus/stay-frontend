import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StartPage} from './start.page';
import {ActivationGuard} from "../auth/activation.guard";

const routes: Routes = [
  {
    path: '',
    component: StartPage,
    canActivate: [ActivationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartPageRoutingModule {
}
