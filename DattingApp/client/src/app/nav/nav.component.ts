import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any={};
loggedIn=false;
  constructor(private _AccountService:AccountService) { }

  ngOnInit(): void {
  }
   Login(){
      this._AccountService.loginUser(this.model).subscribe(res=>{
       console.log(res);
       this.loggedIn=true;
     })
     console.log(this.model);
   }
   Logout()
   {
     this.loggedIn=false;
   }
}
