import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseUrl:string="https://localhost:44372/api/";
  constructor(private _http:HttpClient) {

   }
   loginUser(model:any)
   {
     return this._http.post(this.BaseUrl+'Account/Login',model);
   }
}
