import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, ActivatedRoute, NavigationEnd} from '@angular/router';
import {UserService} from './service/user.service';
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
      .subscribe((data) => {
          console.log(data);
          this.displayName = data.data.displayName;
          if (data.data.avatar != null) {
            this.avatarUrl = data.data.avatar.url;
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
