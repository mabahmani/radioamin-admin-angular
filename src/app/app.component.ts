import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, ActivatedRoute, NavigationEnd} from '@angular/router';
import {UserService} from './service/user.service';
import {Profile} from './model/profile';
import {Success} from './model/success-response';
import {ErrorResponse} from './model/error-response';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'radioaminangular';
  showNavigationAndFooter = false;
  email;
  displayName = '';
  avatarUrl = '/assets/ra.svg';

  constructor(private router: Router, private activeRouter: ActivatedRoute, private userService: UserService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showNavigationAndFooter = event.url !== '/auth';
      } else if (event instanceof NavigationEnd) {
        this.getProfile();
      }
    });

    this.email = localStorage.getItem('email');

  }

  ngOnInit(): void {
  }

  getProfile(): void {
    this.userService.getProfile()
      .subscribe(data => {
          const profile = data as Success<Profile>;
          this.displayName = profile.data.displayName;
          if (profile.data.avatar != null) {
            this.avatarUrl = profile.data.avatar.url;
          }
        },
        error => {
          const errorResponse = error as ErrorResponse;
          for (const error of errorResponse.errors) {
            console.log('error ' + error.message);
          }
        }
      );
  }
}
