import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {ErrorResponse} from '../model/error-response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatarUrl: any = 'assets/ra.svg';
  email: any;
  displayName: any;
  firstName: any;
  lastName: any;
  bio: any;
  avatarLoading: any = false;

  constructor(private userService: UserService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      response => {
          if (response.data.avatar){
            this.avatarUrl = response.data.avatar.url;
          }
          this.email = localStorage.getItem('email');
          this.displayName = response.data.displayName;
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.bio = response.data.bio;
      }
    );
  }

  onAvatarSelect(event: Event): void {
    if (event.target){
      // @ts-ignore
      if ((event.target as HTMLInputElement).files.length > 0) {
        // @ts-ignore
        const file = (event.target as HTMLInputElement).files[0];
        this.avatarLoading = true;
        this.userService.updateAvatar(file).subscribe(
          response => {
            if (response.data.avatar){
              this.avatarUrl = response.data.avatar.url;
              console.log(response.data.avatar);
              this.avatarLoading = false;
            }
          },
          error => {
            this.avatarLoading = false;
            try {
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
  }

  onUpdateProfile(): void{
    const profile = {
      displayName : this.displayName,
      firstName : this.firstName,
      lastName : this.lastName,
      bio: this.bio
    };

    this.userService.updateProfile(profile).subscribe(
      response => {
        if (response.data.avatar){
          this.displayName = response.data.displayName;
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.bio = response.data.bio;
          this.alertService.alert( '', response.message,);
        }
      },
      error => {
        try {
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
    console.log(profile);
  }
}
