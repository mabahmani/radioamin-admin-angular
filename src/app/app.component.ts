import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, ActivatedRoute, NavigationEnd} from '@angular/router';
import {UserService} from './service/user.service';
import {ErrorResponse} from './model/error-response';
import {AuthService} from './service/auth.service';


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

  constructor(private router: Router, private activeRouter: ActivatedRoute, private userService: UserService,
              private authService: AuthService) {
    router.events.forEach((event) => {
      if (authService.isAuthenticated()) {
        if (event instanceof NavigationStart) {
          this.showNavigationAndFooter = event.url !== '/auth';
        } else if (event instanceof NavigationEnd) {
          this.email = localStorage.getItem('email');
          this.getProfile();
        }
      }
      else {
        this.showNavigationAndFooter = false;
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

  logout(): void {
    this.authService.logout().subscribe(
      response => {
        this.authService.clearLocalStorage();
        this.router.navigate(['/auth']);
      }
    );
  }
}
