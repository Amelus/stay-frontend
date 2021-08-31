import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StayInformedPage} from './stay-informed.page';

const routes: Routes = [
  {
    path: '',
    component: StayInformedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StayInformedPageRoutingModule {}
