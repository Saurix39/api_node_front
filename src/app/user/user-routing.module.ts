import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PartnersComponent } from './components/partners/partners.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/user/home/1'
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'home',
        pathMatch:'full',
        redirectTo:'home/1'
      },
      {
        path:'home',
        children:[
          {
            path:':page',
            component:HomeComponent
          }
        ]
      },
      {
        path:'create/post',
        component:CreatePostComponent
      },
      {
        path:'list/post',
        pathMatch:'full',
        redirectTo:'list/post/1'
      },
      {
        path:'list/post',
        children:[
          {
            path:':page',
            component:PostListComponent
          }
        ]
      },
      {
        path:'edit/topic/:id',
        component:PostEditComponent
      },
      {
        path:'settings',
        component:UserEditComponent
      },
      {
        path:'detail/topic/:id',
        component:PostDetailComponent
      },
      {
        path:'partners',
        component:PartnersComponent
      }
    ]
  },
  {
    path:'logout',
    component:LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
