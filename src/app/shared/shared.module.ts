import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsComponent } from './components/topics/topics.component';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';



@NgModule({
  declarations: [
    TopicComponent,
    TopicsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MomentModule,
    RouterModule,
    NgxHighlightJsModule.forRoot(),
  ],
  exports:[
    TopicComponent,
    TopicsComponent
  ]
})
export class SharedModule { }
