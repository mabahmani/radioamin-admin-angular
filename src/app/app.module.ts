import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from './auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { UsersComponent } from './users/users.component';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './profile/profile.component';
import { LanguageComponent } from './language/language.component';
import { GenreComponent } from './genre/genre.component';
import { MoodComponent } from './mood/mood.component';
import { SingersComponent } from './singers/singers.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AlertComponent,
    UsersComponent,
    RoleComponent,
    ProfileComponent,
    LanguageComponent,
    GenreComponent,
    MoodComponent,
    SingersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
