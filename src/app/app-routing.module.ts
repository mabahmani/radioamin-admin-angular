import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardGuard } from './app-guard.guard';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AppGuardGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AppGuardGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AppGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
