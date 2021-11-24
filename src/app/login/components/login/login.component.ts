import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title:String;
  public status:String;
  public user:User;
  public identity:any;
  public token:any;
  constructor(private _userService:UserService, private _router:Router) {
    this.title="Login form";
    this.status="";
    this.user=new User("","","","","","","ROLE_USER");
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this._userService.login(this.user,false).subscribe(
      response=>{
        if(response.status=="error"){
          this.status="error";
        }
        if(response.user && response.user._id){
          this.identity = response.user;
          localStorage.setItem('identity',JSON.stringify(this.identity));
          this._userService.login(this.user,true).subscribe(
            response=>{
              if(response.status=="error"){
                this.status="error";
              }
              if(response.token && response.status=="success"){
                this.token = response.token;
                localStorage.setItem('token',this.token);
                this._router.navigate(['/user']);
              }
            },
            error=>{
              this.status="error";
              console.log(<any>error);
            }
          );
        }
      },
      error=>{
        this.status="error";
        console.log(<any>error);
      }
    );
  }

}
