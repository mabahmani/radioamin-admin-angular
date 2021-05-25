import {Component, OnInit} from '@angular/core';
import {SingerService} from '../service/singer.service';
import {AlertService} from '../service/alert.service';
import {ErrorResponse} from '../model/error-response';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.css']
})
export class SingersComponent implements OnInit {
  show: any = true;
  avatarFile: any;
  avatarName: any = 'Choose Avatar...';
  singers: Array<any> = [];
  first: any;
  currentPage: any;
  totalPages: any;
  last: any;
  sorts: Array<any> = ['id', 'name'];
  directions: Array<any> = ['ASC', 'DESC'];
  sizes: Array<any> = ['5', '10', '20', '50', '100'];
  singer: any;
  sort: any;
  direction: any;
  page: any;
  size: any;
  selectedSinger: any;

  constructor(private singerService: SingerService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.singerService.getSingers().subscribe(
      response => {
        this.singers = response.data.content;
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

  onCreateSinger(singerName: string): void {
    this.singerService.createSinger(singerName, this.avatarFile).subscribe(
      response => {
        this.singers.push(response.data);
        console.log(response);
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
  }

  setAvatar(event: Event): void {
    console.log(event);
    if (event.target) {
      // @ts-ignore
      if ((event.target as HTMLInputElement).files.length > 0) {
        // @ts-ignore
        this.avatarFile = (event.target as HTMLInputElement).files.item(0);
        // @ts-ignore
        this.avatarName = (event.target as HTMLInputElement).files.item(0).name;
      }
    }
  }

  onSelect(singer: any): void {
    this.selectedSinger = singer;
  }

  onClickPage(page: any): void {
    this.singerService.getSingers(undefined, page).subscribe(
      response => {
        this.singers = response.data.content;
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

  onFilterSinger(singerName: any): void {
    this.singer = singerName;
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
    this.size = size;
    this.filter();
  }

  private filter(): void {
    this.singerService.getSingers(this.singer, this.sort, this.direction, this.page, this.size)
      .subscribe(
        (response) => {
          this.singers = response.data.content;
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

  onClickEditSinger(singer: string): void {
    this.singerService.updateSinger(singer, this.avatarFile, this.selectedSinger.id).subscribe(
      response => {
        this.selectedSinger.name = response.data.name;
        this.selectedSinger.avatar = response.data.avatar;
        console.log(response);
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
  }

  onClickDeleteLanguage(): void {
    this.singerService.deleteSinger(this.selectedSinger.id).subscribe(
      response => {
        for (const singer of this.singers) {
          if (this.selectedSinger.id === singer.id) {
            this.singers.splice(this.singers.indexOf(singer), 1);
            break;
          }
        }
        console.log(response);
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
  }
}
