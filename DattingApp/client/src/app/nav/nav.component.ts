import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Users } from '../_model/users';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any={};
// loggedIn=false;
currentUser$:Observable<Users>;

  constructor(public _AccountService:AccountService,private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.currentUser$=this._AccountService.currentuser$;
  }
   Login(){
      this._AccountService.loginUser(this.model).subscribe(res=>{
      this.router.navigateByUrl('/member');
     },error=>
     {
       console.log(error);
       this.toastr.error(error.error);
      })
   }
   Logout()
   {
     this._AccountService.Logout();
    //  this.toastr.success("User LogOut");
     this.router.navigateByUrl('/');
   }
  //  getCurrentUser()
  //  {
  //      this._AccountService.currentuser$.subscribe(user=>{
  //      this.loggedIn=!!user;
  //    },error=>{
  //      console.log(error);
  //    })
  //  }
}
