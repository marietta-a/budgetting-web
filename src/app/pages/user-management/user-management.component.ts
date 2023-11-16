import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import * as UserActions from '../../core/actions/user.actions';
import { mgr } from 'src/app/core/auth-config';
import { UserManagementService } from 'src/app/core/services/user.service';
import { selectUserCollection, selectUsers } from 'src/app/core/selectors/user.selectors';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
   user: User = {
     Id: '',
     Email: '',
     FirstName: '',
     LastName: '',
     UserName: '',
     Password: ''
   }

   users$ = this.store.select(selectUsers);
   
   userCollection$ = this.store.select(selectUserCollection);

   constructor(private store: Store<User>, private userService: UserManagementService){
  
   }

  ngOnDestroy(): void {
      
  }
  ngOnInit(): void {    
      this.userService.getUsers().subscribe(users => {
           this.store.dispatch(UserActions.addUsers({users}));
      })
  }


  createUser(){
     this.userService.createUser(this.user).subscribe(user => {
       if(user){
         this.store.dispatch(UserActions.addUser({user}));
         console.log(this.user)
       }

     })
  }

}
