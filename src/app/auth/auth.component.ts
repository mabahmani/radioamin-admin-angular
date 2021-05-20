import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserRequest} from '../model/user-request';
import {ErrorResponse} from '../model/error-response';
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
    this.authService.login(new UserRequest(this.email, this.password))
      .subscribe(data => {
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          localStorage.setItem('email', this.email);
          this.router.navigate(['']);
        },
        error => {
          try {
            console.log(JSON.stringify(error));
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
