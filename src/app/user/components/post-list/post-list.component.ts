import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { UserService } from 'src/app/core/services/user.service';
import { Topic } from 'src/app/Models/Topic';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  public page_title:String;
  public topics:Array<Topic>;
  public totalTopics:number;
  public identity:any;
  public token:any;
  public status:String;
  public page:number;
  public total_pages:number;
  constructor(
    private _userService:UserService,
    private _topicService:TopicService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.page=1;
    this.totalTopics=0;
    this.total_pages=0;
    this.topics=[];
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.status="";
    this.page_title="My posts list";
  }

  ngOnInit(): void {
    this.chargeVariables();
  }
  chargeVariables():any{
    this._route.params.subscribe(
      (params:Params)=>{
        if(params.page<1 || !params.page){
          this._router.navigate(['/user/list/post/1']);
        }else{
          this.page=params.page;
          this._topicService.getUserTopics(this.page,this.identity._id).subscribe(
            response=>{
              if(response.topics && response.status=='success'){
                this.topics=response.topics;
                this.total_pages=response.totalPages;
                this.totalTopics=response.totalDocs;
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
    );
  }

  counter(i:number){
    return new Array(i);
  }

  deleteTopic(deletedTopic:Topic){
    this._topicService.delete(this.token,deletedTopic._id).subscribe(
      response=>{
        if(response.status=="success"){
          let index = this.topics.indexOf(deletedTopic);
          this.topics.splice(index,1);
          this.totalTopics=this.totalTopics-1;
          let pages = Math.ceil(this.totalTopics/5);
          this.total_pages=pages;
          if(this.total_pages<this.page){
            this._router.navigate(['/user/list/post/',this.total_pages]);
          }
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
