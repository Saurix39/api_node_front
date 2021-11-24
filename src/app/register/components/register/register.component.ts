import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title:String;
  public user:User;
  public status:String;
  constructor(private _userService:UserService) {
    this.title="Register form";
    this.user=new User("","","","","","","ROLE_USER");
    this.status="";
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this._userService.register(this.user).subscribe(
      response=>{
        console.log(response);
        if(response.status=="error"){
          this.status="error";
          console.log(response);
        }
        if(response.user && response.user._id){
          this.status="success";
        }else{
          this.status="error";
          console.log(response);
        }
        form.reset();
      },
      error=>{
        this.status="error";
        console.log(<any>error);
      }
    );
  }

}
