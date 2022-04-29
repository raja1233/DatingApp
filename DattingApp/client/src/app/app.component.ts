import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Users } from './_model/users';
import { AccountService } from './_Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users:any;
  BaseUrl:string="https://localhost:44372/api/Users";
  constructor(private accountservice:AccountService){

  }
  ngOnInit() {
  //  this.getUser();
   this.setCurrentUser();
  }
  setCurrentUser(){
    const user:Users=JSON.parse(localStorage.getItem('user'));
    this.accountservice.setCurrentUser(user);
  }
  // getUser()
  // {
  //   this._http.get(this.BaseUrl)
  //             .subscribe(res=>{
  //             this.users=res;
  //     },error=>{
  //     console.log(error);
  //   });
  // }
}
