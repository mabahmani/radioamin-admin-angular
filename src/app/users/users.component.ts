import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {ErrorResponse} from '../model/error-response';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(data);
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

      }
    );
  }

}
