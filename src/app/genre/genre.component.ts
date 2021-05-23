import {Component, OnInit} from '@angular/core';
import {GenreService} from '../service/genre.service';
import {AlertService} from '../service/alert.service';
import {ErrorResponse} from '../model/error-response';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  show: any;
  genres: Array<any> = [];
  first: any;
  currentPage: any;
  totalPages: any;
  last: any;
  selectedGenre: any;

  constructor(private genreService: GenreService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(
      response => {
        this.genres = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.number;
        this.first = response.data.first;
        this.last = response.data.last;
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

  onAddGenre(genre: string): void {
    this.genreService.addGenre(genre).subscribe(
      response => {
        this.genres.push(response.data);
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

  onSelect(genre: any): void {
    this.selectedGenre = genre;
  }

  onClickPage(page: any): void {
    this.genreService.getGenres(page).subscribe(
      response => {
        this.genres = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.number;
        this.first = response.data.first;
        this.last = response.data.last;
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

  onClickEditGenre(genre: string): void {
    this.genreService.editGenre(genre, this.selectedGenre.id).subscribe(
      response => {
        console.log(response);
        this.selectedGenre.name = genre;
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

  onClickDeleteGenre(): void {
    this.genreService.deleteGenre(this.selectedGenre.id).subscribe(
      response => {
        console.log(response);
        for (const genre of this.genres) {
          if (this.selectedGenre.id === genre.id) {
            this.genres.splice(this.genres.indexOf(genre), 1);
            break;
          }
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
  }
}
