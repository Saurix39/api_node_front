import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/Models/Topic';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  public url:string;
  @Input() topic:Topic;
  @Input() identity:any;
  @Input() detail:any;
  constructor() {
    this.topic=new Topic("","","","","",new Date(),null,null);
    this.url = environment.url;
    this.detail=false;
  }

  ngOnInit(): void {
  }

}
