import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users:any;
  BaseUrl:string="https://localhost:44372/api/Users";
  constructor(private _http:HttpClient){

  }
  ngOnInit() {
   //this.users= this.getUser();
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
