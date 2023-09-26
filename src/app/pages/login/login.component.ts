import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/app.module';
import {User, UserManager, UserManagerSettings} from 'oidc-client';
import { config, mgr } from 'src/app/core/auth-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  mgr: UserManager;
  log() {
      document.getElementById('results').innerText = '';
      console.log(`id ${document.getElementById('results')}`);

      Array.prototype.forEach.call(arguments, function (msg) {
          if (msg instanceof Error) {
              msg = "Error: " + msg.message;
          }
          else if (typeof msg !== 'string') {
              msg = JSON.stringify(msg, null, 2);
          }
          document.getElementById('results').innerHTML += msg + '\r\n';
      });
  }
  constructor(){
      console.log(config)
     
      console.log(mgr);
      mgr.getUser().then(function (user) {
        if (user) {
            this.log("User logged in", user.profile);
        }
        else {
            console.log("User not logged in");
        }});
  }

  ngOnInit() {
    // document.getElementById("login").addEventListener("click", this.login, false);
    // document.getElementById("api").addEventListener("click", this.api, false);
    // document.getElementById("logout").addEventListener("click", this.logout, false);
  }
  ngOnDestroy() {
  }

  login() {
      console.log(mgr);
      mgr.signinRedirect();
  }

  api() {
      mgr.getUser().then(function (user) {
          var url = "https://localhost:6001/identity";

          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
            console.log(`${xhr.status} : ${JSON.parse(xhr.responseText)}`);
          }
          xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
          xhr.send();
      });
  }

  logout() {
      console.log(`logout: ${mgr}`)
      mgr.signoutRedirect();
  }

}

