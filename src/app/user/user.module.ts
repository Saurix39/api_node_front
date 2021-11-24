import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from './components/logout/logout.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { PostListComponent } from './components/post-list/post-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { MomentModule } from 'angular2-moment';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';
import { PartnersComponent } from './components/partners/partners.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CreatePostComponent,
    HomeComponent,
    LogoutComponent,
    UserEditComponent,
    PostListComponent,
    PostEditComponent,
    PostDetailComponent,
    PartnersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    AngularFileUploaderModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ]
})
export class UserModule { }
