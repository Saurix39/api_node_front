import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { UserService } from 'src/app/core/services/user.service';
import { Topic } from 'src/app/Models/Topic';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  public page_title:string;
  public topic: Topic;
  public identity:any;
  public token:any;
  public status:string;
  constructor(
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _topicService:TopicService
  ) {
    this.page_title="Edit this topic";
    this.status="";
    this.identity=this._userService.getIdentity();
    this.topic=new Topic("","","","","",new Date(),this.identity._id,null);
    this.token=this._userService.getToken();
  }


  ngOnInit(): void {
    this.searchTopic();
  }

  searchTopic(){
    this._route.params.subscribe(
      (params:Params)=>{
        let id = params.id;
        this._topicService.getTopic(id).subscribe(
          response=>{
            if(response.topic && response.status=="success"){
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
    );
  }
  onSubmit(form:NgForm){
    var id = this.topic._id;
    this._topicService.update(this.topic,this.token,id).subscribe(
      response=>{
        if(response.topic && response.status=="success"){
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
