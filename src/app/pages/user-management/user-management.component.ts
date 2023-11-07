import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';
import { config } from 'src/app/core/auth-config';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
   user: UserInfo;
   urlBase: string = config.authority;
   http: HttpClient;

   constructor(http: HttpClient){
      this.http = http;
   }

  createUser(){
    let fd = new FormData();
    var user = JSON.stringify(user);
    fd.append("user", user);
    let url = this.urlBase + '/user';
    this.http.post(url, user);
  }

}
