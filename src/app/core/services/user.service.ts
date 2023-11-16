import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, catchError, retry } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  urlBase: string;
  
  constructor(private httpClient: HttpClient) {
    this.urlBase = "https://localhost:6001/api/user";
   }


   createUser(user) : Observable<User>{
      let url = this.urlBase + "/createuser";
      return this.httpClient.post<User>(url, user, this.httpOptions).pipe(
        retry(1),
        catchError(this.errorHandler)
      )
   }

   getUsers(): Observable<User[]>{
    let url = this.urlBase + "/getallusers";
     return this.httpClient.get<User[]>(url, this.httpOptions).pipe(
        retry(1),
        catchError(this.errorHandler)
     )
   }

   errorHandler(error) : ObservableInput<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
function throwError(errorMessage: string) : ObservableInput<any>{
  throw new Error(errorMessage);
}

