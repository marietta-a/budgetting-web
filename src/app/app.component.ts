import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  
  constructor(private oauthService: OAuthService ){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.initCodeFlow();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
