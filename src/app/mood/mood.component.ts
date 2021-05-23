import {Component, OnInit} from '@angular/core';
import {GenreService} from '../service/genre.service';
import {MoodService} from '../service/mood.service';
import {AlertService} from '../service/alert.service';
import {ErrorResponse} from '../model/error-response';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {

  allGenres: Array<any> = [];
  allGenresEditModal: Array<any> = [];
  selectedGenres: Array<any> = [];
  selectedGenresEditModal: Array<any> = [];
  moods: Array<any> = [];
  totalPages: any;
  currentPage: any;
  first: any;
  last: any;
  show: any;
  selectedMood: any;

  constructor(private genreService: GenreService, private moodService: MoodService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.genreService.getGenres()
      .subscribe(
        response => {
          this.allGenres = response.data.content;
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

    this.moodService.getMoods()
      .subscribe(
        response => {
          console.log(response);
          this.moods = response.data.content;
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

  onClickAddGenre(genre: any): void {
    for (const myGenre of this.allGenres) {
      if (myGenre.id === genre.id) {
        this.allGenres.splice(this.allGenres.indexOf(myGenre), 1);
        break;
      }
    }

    this.selectedGenres.push(genre);
  }

  onClickRemoveGenre(genre: any): void {
    for (const myGenre of this.selectedGenres) {
      if (myGenre.id === genre.id) {
        this.selectedGenres.splice(this.selectedGenres.indexOf(myGenre), 1);
        break;
      }
    }

    this.allGenres.push(genre);
  }

  onCreateMood(mood: string): void {
    this.moodService.addMood(mood, this.selectedGenres)
      .subscribe(
        response => {
          this.moods.push(response.data);
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

  onSelect(mood: any): void {
    this.selectedMood = mood;
    this.allGenresEditModal = [];
    this.selectedGenresEditModal = [];

    for (const g of this.allGenres){
      this.allGenresEditModal.push(g);
    }
    for (const g of mood.genres){
      this.selectedGenresEditModal.push(g);
    }

    for (const selectedGenre of this.selectedGenresEditModal) {
      let founded = false;
      let foundedGenreId = -1;
      for (const myGenre of this.allGenresEditModal){
        if (myGenre.id === selectedGenre.id){
          founded = true;
          foundedGenreId = this.allGenresEditModal.indexOf(myGenre);
          break;
        }
      }
      if (founded){
        this.allGenresEditModal.splice(foundedGenreId, 1);
      }
    }
  }

  onClickEditMood(mood: string): void {
    this.moodService.editMood(mood, this.selectedMood.id, this.selectedGenresEditModal)
      .subscribe(
        response => {
          this.selectedMood.name = mood;
          this.selectedMood.genres = this.selectedGenresEditModal;
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

  onClickAddGenreEditModal(genre: any): void {
    for (const myGenre of this.allGenresEditModal) {
      if (myGenre.id === genre.id) {
        this.allGenresEditModal.splice(this.allGenresEditModal.indexOf(myGenre), 1);
        break;
      }
    }

    this.selectedGenresEditModal.push(genre);
  }

  onClickRemoveGenreEditModal(genre: any): void {
    for (const myGenre of this.selectedGenresEditModal) {
      if (myGenre.id === genre.id) {
        this.selectedGenresEditModal.splice(this.selectedGenresEditModal.indexOf(myGenre), 1);
        break;
      }
    }

    this.allGenresEditModal.push(genre);
  }

  onClickDeleteMood(): void {
    this.moodService.deleteMood(this.selectedMood.id)
      .subscribe(
        response => {
          for (const mood of this.moods) {
            if (this.selectedMood.id === mood.id) {
              this.moods.splice(this.moods.indexOf(mood), 1);
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

  onClickPage(page: any): void {
    this.moodService.getMoods(page)
      .subscribe(
        response => {
          console.log(response);
          this.moods = response.data.content;
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
}
