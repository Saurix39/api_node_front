import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/Models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public title:string;
  public identity:any;
  public token:any;
  public user:User;
  public status:string;
  public afuConfig:any;
  public url:string;
  constructor(
    private _router:Router,
    private _route: ActivatedRoute,
    private _userService:UserService
    ){
    this.title="User settings";
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.user=new User(this.identity.sub,this.identity.name,this.identity.surname,this.identity.email,"",this.identity.image,"ROLE_USER");
    this.status="";
    this.url=environment.url;
    this.afuConfig={
      multiple:false,
      formatsAllowed:".jpg, .jpeg, .png, .gif",
      maxSize: "50",
      uploadAPI:{
        url: environment.url+'/upload-avatar',
        headers:{
          "Authorization":this.token
        }
      },
      theme:"attachPin",
      hidePogressbar:false,
      hideResetBtn:true,
      hideSelectBtn:false,
      attachPinText:'Sube tu avatar',
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Upload your avatar',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this._userService.update(this.user,this.token).subscribe(
      response=>{
        if(!response.user){
          this.status="error";
          console.log(response);
        }else{
          this.status="success";
          localStorage.setItem('identity',JSON.stringify(this.user));
        }
      },
      error=>{
        this.status="error";
        console.log(<any>error);
      }
    );
  }
  avatarUpload(data:any){
    this.user.image=data.body.user.image;
  }

}
