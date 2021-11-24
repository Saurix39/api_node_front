import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { param } from 'jquery';
import { TopicService } from 'src/app/core/services/topic.service';
import { UserService } from 'src/app/core/services/user.service';
import { Topic } from 'src/app/Models/Topic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public page:number;
  public total_pages:number;
  public total_topics:number;
  public topics:Array<Topic>;
  public identity:any;
  public token:any;
  public status:String;
  public page_title:string;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _topicService:TopicService
  ) {
    this.page=1;
    this.total_pages=0;
    this.total_topics=0;
    this.topics=[];
    this.status="";
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.page_title="Watch your partner´s topics";
  }

  ngOnInit(): void {
    this.chargeVariables();
  }
  chargeVariables(){
    this._route.params.subscribe(
      (params:Params)=>{
        if(!params.page || params.page< 0){
          this._router.navigate(['/user/home/1']);
        }else{
          this.page=params.page;
          this._topicService.getTopics(this.page).subscribe(
            response=>{
              if(response.topics && response.status=="success"){
                this.topics=response.topics;
                this.total_pages=response.totalPages;
                this.total_topics=response.totalDocs;
              }else{
                console.log(response);
              }
            },
            error=>{
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

}
