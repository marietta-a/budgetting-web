import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import * as UserActions from '../../core/actions/user.actions';
import { mgr } from 'src/app/core/auth-config';
import { UserManagementService } from 'src/app/core/services/user.service';
import { selectUserCollection, selectUsers } from 'src/app/core/selectors/user.selectors';
import { UserState } from 'src/app/core/reducers/user.reducer';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
   user: User = {
     id: '',
     email: '',
     firstName: '',
     lastName: '',
     userName: '',
     password: ''
   }

  //  users$ = this.store.select(selectUsers);
  users$: Dictionary<User>;
   
   userCollection$ = this.store.select(selectUserCollection);

   constructor(private store: Store<any>, private userService: UserManagementService){
    
   }

  ngOnDestroy(): void {
      
  }
  async ngOnInit(): Promise<void> { 
    await this.userService.getUsers().subscribe((response: any) => {
      this.store.dispatch(UserActions.setUsers({users: response.result}));
      this.store.select('user').subscribe(user => {
          this.users$ = user.entities;
          console.log(this.users$)
      })
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
