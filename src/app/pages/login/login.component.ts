import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  constructor(private oauthService: OAuthService ){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.initCodeFlow(); 
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login(){
    console.log("logging in ...");
    this.oauthService.initLoginFlow();
    console.log(this.oauthService.initLoginFlow())
  }

  logout() { 
    this.oauthService.logOut(); 
  }

  refresh() { 
    this.oauthService.silentRefresh(); 
  }

  revoke(){
    this.oauthService.revokeTokenAndLogout();
  }
}

