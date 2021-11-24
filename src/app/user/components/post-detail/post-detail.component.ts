import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommentService } from 'src/app/core/services/comment.service';
import { TopicService } from 'src/app/core/services/topic.service';
import { UserService } from 'src/app/core/services/user.service';
import { Comment } from 'src/app/Models/Comment';
import { Topic } from 'src/app/Models/Topic';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public topic:Topic;
  public page_title:string;
  public status:string;
  public comment:Comment;
  public identity:any;
  public token:any;
  public url:string;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _topicService:TopicService,
    private _userservice:UserService,
    private _commentService:CommentService
  ) {
    this.topic = new Topic("","","","","",new Date(),null,null);
    this.page_title="";
    this.status=""; 
    this.identity=this._userservice.getIdentity();
    this.token=this._userservice.getToken();
    this.comment=new Comment("","",new Date(),this.identity);
    this.url=environment.url;
  }

  ngOnInit(): void {
    this.chargeVariables();
  }
  chargeVariables(){
    this._route.params.subscribe(
      (params:Params)=>{
        if(!params.id){
          this.status="no-params";
        }else{
          var id = params.id;
          this._topicService.getTopic(id).subscribe(
            response=>{
              this.topic=response.topic;
              this.status="success";
            },
            error=>{
              this.status="error";
              console.log(<any>error);
            }
          );
        }

      }
    );
  }
  onSubmit(form:NgForm){
    this._commentService.addComment(this.comment,this.token,this.topic._id).subscribe(
      response=>{
        if(response.status=="success" && response.topic){
          form.reset();
          this.topic=response.topic;
          this.status="success-comment";
        }else{
          this.status="error-comment";
        }
      },
      error=>{
        this.status="error-comment";
        console.log(<any>error);
      }
    );
  }
  deleteComment(idComment:any){
    this._commentService.deleteComment(this.token,this.topic._id,idComment).subscribe(
      response=>{
        if(response.status=="success" && response.topic){
          this.topic=response.topic;
          this.status="success-delete";
        }else{
          this.status="error-delete";
        }
      },
      error=>{
        console.log(<any>error);
        this.status="error-delete";
      }
    );
  }

}
