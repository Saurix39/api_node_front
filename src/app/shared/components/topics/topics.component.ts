import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/Models/Topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  @Input() topics:Array<Topic>;
  @Input() identity:any;
  constructor() {
    this.topics=[];    
  }

  ngOnInit(): void {
  }

}
