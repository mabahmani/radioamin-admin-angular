import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user';
import {Success} from '../model/success-response';
import {ErrorResponse} from '../model/error-response';
import {JwtResponse} from '../model/jwt-response';
import {AlertService} from '../service/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onClickSignIn(): void {
    this.authService.login(new User(this.email, this.password))
      .subscribe(data => {
          const response = data as Success<JwtResponse>;
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('email', this.email);
          this.router.navigate(['']);
        },
        error => {
          try {
            const errorResponse = error as ErrorResponse;
            for (const error of errorResponse.errors) {
              this.alertService.alert(error.message, error.errorType);
            }
          } catch (e) {
            this.alertService.alert(error.message, '');

          }

        });
  }
}
