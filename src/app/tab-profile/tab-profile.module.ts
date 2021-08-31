import {IonicModule} from '@ionic/angular';
// @ts-ignore
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabProfilePage} from './tab-profile.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {TabProfilePageRoutingModule} from './tab-profile-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabProfilePage]
})
export class TabProfilePageModule {}
