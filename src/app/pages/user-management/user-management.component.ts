import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import * as UserActions from '../../core/actions/user.actions';
import { mgr } from 'src/app/core/auth-config';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
   user: User = {
     id: '',
     email: '',
     firstName: '',
     lastName: '',
     userName: '',
     password: ''
   }
   urlBase: string = "https://localhost:6001/api";
   http: HttpClient;

   constructor(private store: Store<{user: User}>, httpClient: HttpClient){
      this.http = httpClient;
      store.select('user').subscribe((response: User) => {
          this.user = response;
      })
      mgr.getUser().then(function(u) {

        console.log(`user management logged in user details: ${u}`)
      })
   }

  createUser(){
    try{
      console.log('creating user \n');
        this.store.dispatch(UserActions.addUser({user: this.user}))
    }
    catch(e){
      console.log(`creating user error: ${e}`);
    }
    // let fd = new FormData();
    // console.log(this.user)
    // var user = JSON.stringify(this.user);
    // fd.append("user", user);
    // let url = this.urlBase + '/User/CreateUser';
    // this.http.post(url, user);
    // console.log(url);
    // console.log(user)
  }

}
