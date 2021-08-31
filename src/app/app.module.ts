import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {AuthGuard} from "./auth/auth.guard";
import {API_BASE_URL} from "./api/api";
import {AuthInterceptor} from "./auth/auth.interceptor";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  exports: [BrowserModule],
  providers: [
    FormBuilder,
    AuthGuard,
    {provide: API_BASE_URL, useFactory: baseUrl},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function baseUrl(): string {
  return 'http://localhost:3000' + '/api';
}
