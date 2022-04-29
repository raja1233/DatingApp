import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  @Input() userFromHomeComponent:any;
  @Output() RegisterCancel=new EventEmitter();
  constructor( private _accountService:AccountService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {
    console.log(this.model);
    this._accountService.register(this.model).subscribe(res=>{
      console.log(res);
      this.toastr.success("User registered Sucessfully");
      this.cancel();
    },error=>{
      console.log(error);
      this.toastr.error(error.error);
    } );
  }
  cancel(){
    // console.log('Cancel');
    this.RegisterCancel.emit(false);

  }
}
