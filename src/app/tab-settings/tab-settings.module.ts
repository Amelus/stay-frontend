import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
// @ts-ignore
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabSettingsPage} from './tab-settings.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {TabSettingsPageRoutingModule} from './tab-settings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TabSettingsPage }]),
    TabSettingsPageRoutingModule,
  ],
  declarations: [TabSettingsPage]
})
export class TabSettingsPageModule {}
