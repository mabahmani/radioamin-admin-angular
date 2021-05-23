import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {ErrorResponse} from '../model/error-response';
import {AlertService} from '../service/alert.service';
import {RoleService} from '../service/role.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any> = [];
  roles: Array<any> = [];
  directions: Array<any> = ['ASC', 'DESC'];
  sorts: Array<any> = ['Email', 'Active', 'createdAt'];
  sizes: Array<any> = ['5', '10', '20', '50', '100'];
  selectedUser: any;
  totalPages: any;
  currentPage: any;
  first: any;
  last: any;
  email: any;
  role: any;
  page: any;
  size: any;
  sort: any;
  active: any;
  direction: any;
  show: any;

  constructor(private userService: UserService, private alertService: AlertService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.number;
        this.first = response.data.first;
        this.last = response.data.last;
        this.show = true;
        console.log(response);
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

    this.roleService.getRoles().subscribe(
      response => {
        this.roles = response.data;
        console.log(response);
      }
    );

  }

  changeUserActivation(user: any): void {
    this.userService.changeUserActivation(!user.active, user.id).subscribe(
      response => {
        user.active = response.data;
      }
    );
  }

  onClickPage(page: any): void {
    this.page = page;
    this.filter();
  }

  onClickSaveRoles(): void {
    this.userService.setUserRoles(this.selectedUser.id, this.selectedUser.userRoles)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onClickSetRoles(user: any): void {
    this.selectedUser = user;
  }

  onClickRole(role: any): void {
    let removed = false;

    for (const uRole of this.selectedUser.userRoles) {
      if (uRole.role === role.role) {
        this.selectedUser.userRoles.splice(this.selectedUser.userRoles.indexOf(uRole), 1);
        removed = true;
        break;
      }
    }

    if (!removed) {
      this.selectedUser.userRoles.push(role);
    }
  }

  onFilterActive(active: any): void {
    console.log(active);
    this.active = active;
    this.filter();
  }

  onFilterSort(sort: any): void {
    this.sort = sort;
    this.filter();
  }

  onFilterDirection(direction: any): void {
    this.direction = direction;
    this.filter();
  }

  onFilterSize(size: any): void {
    this.page = null;
    this.size = size;
    this.filter();
  }

  onFilterRole(role: any): void {
    this.role = role;
    this.filter();
  }

  onFilterEmail(email: any): void {
    this.email = email;
    this.filter();
  }

  private filter(): void {
    this.userService.getUsers(this.email, this.active, this.role, this.sort, this.direction, this.page, this.size)
      .subscribe(
        (response) => {
          this.users = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
          this.first = response.data.first;
          this.last = response.data.last;
          this.show = true;
          console.log(response);
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

  userHasRole(role: any): boolean {
    if (this.selectedUser) {
      const foundedRole = this.selectedUser.userRoles.find((x: any) => x.id === role.id);
      console.log(foundedRole);
      return foundedRole !== undefined;
    }

    return false;
  }

}
