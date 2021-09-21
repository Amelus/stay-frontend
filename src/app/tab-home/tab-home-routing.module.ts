import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabHomePage} from './tab-home.page';
import {ReverseActivationGuard} from "../auth/reverse-activation.guard";

const routes: Routes = [
  {
    path: '',
    component: TabHomePage,
    canActivate: [ReverseActivationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabHomePageRoutingModule {}
