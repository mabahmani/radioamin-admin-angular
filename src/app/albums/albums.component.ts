import { Component, OnInit } from '@angular/core';
import {SingerService} from '../service/singer.service';
import {AlbumService} from '../service/album.service';
import {AlertService} from '../service/alert.service';
import {ErrorResponse} from '../model/error-response';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  show: any = true;
  coverName: any = 'Choose Cover...';
  singers: Array<any> = [];
  coverFile: any;
  selectedSingerId: any;
  albums: Array<any> = [];
  first: any;
  currentPage: any;
  totalPages: any;
  last: any;
  sorts: Array<any> = ['id', 'name'];
  directions: Array<any> = ['ASC', 'DESC'];
  sizes: Array<any> = ['5', '10', '20', '50', '100'];
  album: any;
  sort: any;
  direction: any;
  page: any;
  size: any;
  selectedAlbum: any;

  constructor(private singerService: SingerService, private albumService: AlbumService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.singerService.getAllSingers().subscribe(
      response => {
        this.singers = response.data;
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

    this.albumService.getAlbums().subscribe(
      response => {
        this.albums = response.data.content;
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

  setAvatar(event: Event): void {
    console.log(event);
    if (event.target) {
      // @ts-ignore
      if ((event.target as HTMLInputElement).files.length > 0) {
        // @ts-ignore
        this.coverFile = (event.target as HTMLInputElement).files.item(0);
        // @ts-ignore
        this.coverName = (event.target as HTMLInputElement).files.item(0).name;
      }
    }
  }

  onCreateAlbum(albumName: any, releaseYear: any): void {
    this.albumService.createAlbum(albumName, this.selectedSingerId == null ? -1 : this.selectedSingerId,
      releaseYear, this.coverFile).subscribe(
      response => {
        this.albums.push(response.data);
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

  onSelectSinger(singerId: any): void {
    console.log(singerId);
    this.selectedSingerId = singerId;
  }

  onSelect(album: any): void {
    this.selectedAlbum = album;
  }

  onFilterAlbum(albumName: any): void {
    this.album = albumName;
    this.filter();
  }

  private filter(): void {
    this.albumService.getAlbums(this.album, this.sort, this.direction, this.page, this.size)
      .subscribe(
        (response) => {
          this.albums = response.data.content;
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

  onClickPage(page: any): void {
    this.albumService.getAlbums(this.album, this.sort, this.direction, page, this.size).subscribe(
      response => {
        this.albums = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.number;
        this.first = response.data.first;
        this.last = response.data.last;
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

  onClickEditAlbum(albumName: any, releaseYear: any): void {
    console.log(releaseYear);
    this.albumService.editAlbum(albumName, this.selectedSingerId == null ? this.selectedAlbum.singer.id : this.selectedSingerId,
      releaseYear, this.coverFile, this.selectedAlbum.id).subscribe(
      response => {
        this.selectedAlbum.name = response.data.name;
        this.selectedAlbum.cover = response.data.cover;
        this.selectedAlbum.releaseDate = response.data.releaseDate;
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

  onClickDeleteAlbum(): void {
    this.albumService.deleteAlbum(this.selectedAlbum.id).subscribe(
      response => {
        for (const album of this.albums) {
          if (this.selectedAlbum.id === album.id) {
            this.albums.splice(this.albums.indexOf(album), 1);
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
