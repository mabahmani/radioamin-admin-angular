import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardGuard } from './app-guard.guard';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {RoleComponent} from './role/role.component';
import {ProfileComponent} from './profile/profile.component';
import {LanguageComponent} from './language/language.component';
import {GenreComponent} from './genre/genre.component';
import {MoodComponent} from './mood/mood.component';
import {SingersComponent} from './singers/singers.component';
import {AlbumsComponent} from './albums/albums.component';
import {MusicComponent} from './music/music.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AppGuardGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AppGuardGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AppGuardGuard] },
  { path: 'roles', component: RoleComponent, canActivate: [AppGuardGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AppGuardGuard] },
  { path: 'languages', component: LanguageComponent, canActivate: [AppGuardGuard] },
  { path: 'genres', component: GenreComponent, canActivate: [AppGuardGuard] },
  { path: 'moods', component: MoodComponent, canActivate: [AppGuardGuard] },
  { path: 'singers', component: SingersComponent, canActivate: [AppGuardGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate: [AppGuardGuard] },
  { path: 'musics', component: MusicComponent, canActivate: [AppGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
