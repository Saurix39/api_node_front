import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, DoCheck {
  public identity:any;
  public token:any;
  public url:string;
  constructor(private _userService:UserService) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.url=environment.url;
  }
  ngOnInit(): void {
  }
  ngDoCheck(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

}
