import {HttpClientModule} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../../../environments/environment';
import {RouteReuseStrategy} from '@angular/router';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ]
})
export class UserClientModule {
}
