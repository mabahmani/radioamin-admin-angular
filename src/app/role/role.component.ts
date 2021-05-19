import { Component, OnInit } from '@angular/core';
import {RoleService} from '../service/role.service';
import {ErrorResponse} from '../model/error-response';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Array<any> = [];
  show: any;

  constructor(private roleService: RoleService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      response => {
        this.roles = response.data;
        this.show = true;
      },
      error => {
        try {
          this.show = false;
          const errorResponse = error as ErrorResponse;
          // tslint:disable-next-line:no-shadowed-variable
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
