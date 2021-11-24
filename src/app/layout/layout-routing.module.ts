import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutModule } from '../about/about.module';
import { HomeModule } from '../home/home.module';
import { RegisterModule } from '../register/register.module';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'home',
        loadChildren:()=> import('../home/home.module').then(m=>HomeModule)
      },
      {
        path:'about',
        loadChildren: ()=> import('../about/about.module').then(m=>AboutModule)
      },
      {
        path:'register',
        loadChildren: ()=> import('../register/register.module').then(m=>RegisterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
