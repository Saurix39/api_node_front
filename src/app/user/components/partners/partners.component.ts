import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/Models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  public partners:Array<User>;
  public identity:any;
  public token:any;
  public url:string;
  public status:string;
  constructor(private _userService:UserService) {
    this.partners=[];
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.url=environment.url;
    this.status="";
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this._userService.getUsers().subscribe(
      response=>{
        if(response.users && response.status=="success"){
          this.partners=response.users;
        }else{
          this.status="error";
        }
      },
      error=>{
        console.log(<any>error);
        this.status="error";
      }
    );
  }

}
