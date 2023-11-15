/*!

=========================================================
* Argon Dashboard Angular - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-angular
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-angular/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(HttpClientModule),
    provideOAuthClient(),
    provideStore()
]
  });