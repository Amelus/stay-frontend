import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StayInTouchPage } from './stay-in-touch.page';

const routes: Routes = [
  {
    path: '',
    component: StayInTouchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StayInTouchPageRoutingModule {}
