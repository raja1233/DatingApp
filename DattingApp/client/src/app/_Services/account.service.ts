import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { Users } from '../_model/users';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseUrl:string="https://localhost:44372/api/";
  private currentUserSource= new ReplaySubject<Users>(1);
  public currentuser$=this.currentUserSource.asObservable();
  constructor(private _http:HttpClient) {

   }
   loginUser(model:any)
   {
     return this._http.post(this.BaseUrl+'Account/Login',model).pipe(
       map((response:Users)=>{
         const user=response;
         if(user)
         {
           localStorage.setItem('user',JSON.stringify(user));
           this.currentUserSource.next(user);
         }
       })
     )
   }
   register(model:any)
   {
     return this._http.post(this.BaseUrl+'Account/register',model).pipe(
       map((user:Users)=>{
         if(user){
           localStorage.setItem('user',JSON.stringify(user));
           this.currentUserSource.next(user);
         }
         return user;
       })
     )
   }
   setCurrentUser(user:Users)
   {
      this.currentUserSource.next(user);
   }
   Logout()
   {
     localStorage.removeItem('user');
     this.currentUserSource.next(null);
   }
}
