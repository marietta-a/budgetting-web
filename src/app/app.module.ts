import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard } from './core/auth-guard';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, RouterStateSnapshot } from "@angular/router";
import { AuthService } from './core/auth-service';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './core/reducers/user.reducer';
import { UserManagementService } from './core/services/user.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot({user: userReducer})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthService, 
    UserManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }