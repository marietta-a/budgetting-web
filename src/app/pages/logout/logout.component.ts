import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';
import { mgr } from 'src/app/core/auth-config';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  mgr: UserManager;
  constructor(){
      mgr.getUser().then(function (user) {
        if (user) {
            this.log("User logged in", user.profile);
        }
        else {
            console.log("User not logged in");
        }});
  }

  ngOnInit() {
    
  }
  ngOnDestroy() {
  }

  logout() {
      mgr.signoutRedirect();
  }

}
