import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode=false;
users:any;
BaseUrl:string="https://localhost:44372/api/Users/Users";
  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
    this.getUser();
  }
  registerToggle(){
    this.registerMode=!this.registerMode;
  }
  getUser()
  {
    this._http.get(this.BaseUrl).subscribe(user=>this.users=user);
  }
  CancelRegisterMode(event:boolean){
    this.registerMode=event;
  }
}
