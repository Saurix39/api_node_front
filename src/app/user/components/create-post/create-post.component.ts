import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { UserService } from 'src/app/core/services/user.service';
import { Topic } from 'src/app/Models/Topic';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public page_title:string;
  public topic: Topic;
  public identity:any;
  public token:any;
  public status:string;
  constructor(private _router:Router,
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _topicService:TopicService
    ) 
  {
    this.page_title="Create a new post";
    this.status="";
    this.identity=this._userService.getIdentity();
    this.topic=new Topic("","","","","",new Date(),this.identity._id,null);
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this._topicService.save(this.topic,this.token).subscribe(
      response=>{
        if(response.status=="success" && response.topic){
          this.status="success";
          this.topic=response.topic;
        }else{
          this.status="error";
          console.log(response);
        }
      },
      error=>{
        this.status="error";
        console.log(<any>error);
      }
    );
  }

}
