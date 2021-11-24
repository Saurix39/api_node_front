import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './home.guard';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { UserGuard } from './user.guard';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path:'',
    canActivate:[HomeGuard],
    loadChildren:() => import('./layout/layout.module').then(m => LayoutModule)
  },
  {
    path:'login',
    canActivate:[HomeGuard],
    loadChildren:() => import('./login/login.module').then(m => LoginModule)
  },
  {
    path:'user',
    canActivate:[UserGuard],
    loadChildren: () => import('./user/user.module').then(m => UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
