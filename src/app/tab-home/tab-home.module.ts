import {IonicModule} from '@ionic/angular';
// @ts-ignore
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabHomePage} from './tab-home.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {TabHomePageRoutingModule} from './tab-home-routing.module';
import {ComponentModule} from "../components/component.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabHomePageRoutingModule,
    ComponentModule
  ],
  declarations: [TabHomePage]
})
export class TabHomePageModule {}
