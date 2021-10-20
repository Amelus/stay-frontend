import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StayInTouchAdminPage} from './stay-in-touch-admin.page';
import {AdminGuard} from "../auth/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: StayInTouchAdminPage,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StayInTouchAdminPageRoutingModule {
}
