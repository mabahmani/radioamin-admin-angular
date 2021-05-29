import {Component, OnInit} from '@angular/core';
import {ErrorResponse} from '../model/error-response';
import {SingerService} from '../service/singer.service';
import {AlbumService} from '../service/album.service';
import {LanguageService} from '../service/language.service';
import {GenreService} from '../service/genre.service';
import {AlertService} from '../service/alert.service';
import {MusicService} from '../service/music.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  show: any = true;
  musics: Array<any> = [];
  coverName: any = 'Choose Cover...';
  types: Array<any> = ['VOCAL', 'VIDEO'];
  selectedType: any;
  albums: Array<any> = [];
  selectedAlbum: any;
  singers: Array<any> = [];
  selectedSinger: any;
  languages: Array<any> = [];
  selectedLanguage: any;
  coverFile: any;
  sorts: Array<any> = ['id', 'name', 'published', 'musicType', 'singer', 'language', 'album'];
  directions: Array<any> = ['ASC', 'DESC'];
  sizes: Array<any> = ['5', '10', '20', '50', '100'];
  music: any;
  sort: any;
  direction: any;
  page: any;
  size: any;
  first: any;
  currentPage: any;
  totalPages: any;
  last: any;
  selectedMusic: any;
  vocalTypes: Array<any> = ['MP3_64', 'MP3_128', 'MP3_320'];
  videoTypes: Array<any> = ['VIDEO_480', 'VIDEO_720', 'VIDEO_1080'];
  selectedMusicType: any;
  musicFileName: any = 'Choose File...';
  musicFile: any;
  progress: any;
  showProgress: any = false;
  allGenresEditModal: Array<any> = [];
  selectedGenresEditModal: Array<any> = [];
  allGenres: Array<any> = [];


  constructor(
    private musicService: MusicService,
    private singerService: SingerService,
    private albumService: AlbumService,
    private languageService: LanguageService,
    private genreService: GenreService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {

    this.musicService.getMusics().subscribe(
      response => {
        this.musics = response.data.content;
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

    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = response.data;
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

    this.languageService.getAllLanguages().subscribe(
      response => {
        this.languages = response.data;
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

    this.genreService.getAllGenres()
      .subscribe(
        response => {
          this.allGenres = response.data;
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

  setCover(event: Event): void {
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

  onSelectType(type: any): void {
    this.selectedType = type;
  }

  onSelectAlbum(value: any): void {
    this.selectedAlbum = value;
  }

  onSelectSinger(value: any): void {
    this.selectedSinger = value;
  }

  onSelectLanguage(value: any): void {
    this.selectedLanguage = value;
  }

  onCreateMusic(value: any): void {
    this.musicService.draftMusic(value, this.selectedType,
      this.selectedSinger,
      this.selectedAlbum,
      this.selectedLanguage, this.coverFile).subscribe(
      response => {
        this.musics.push(response.data);
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

  private filter(): void {
    this.musicService.getMusics(this.music, this.sort, this.direction, this.page, this.size)
      .subscribe(
        (response) => {
          this.musics = response.data.content;
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


  onFilterMusic(value: any): void {
    this.music = value;
    this.filter();
  }


  onClickPage(page: any): void {
    this.musicService.getMusics(this.music, this.sort, this.direction, page, this.size).subscribe(
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

  onSelect(music: any): void {
    this.showProgress = false;
    this.progress = '0';
    this.selectedMusic = music;

    this.allGenresEditModal = [];
    this.selectedGenresEditModal = [];

    for (const g of this.allGenres) {
      this.allGenresEditModal.push(g);
    }
    for (const g of music.genres) {
      this.selectedGenresEditModal.push(g);
    }

    for (const selectedGenre of this.selectedGenresEditModal) {
      let founded = false;
      let foundedGenreId = -1;
      for (const myGenre of this.allGenresEditModal) {
        if (myGenre.id === selectedGenre.id) {
          founded = true;
          foundedGenreId = this.allGenresEditModal.indexOf(myGenre);
          break;
        }
      }
      if (founded) {
        this.allGenresEditModal.splice(foundedGenreId, 1);
      }
    }
  }

  changePublishState(music: any): void {
    this.musicService.publishMusic(music.id).subscribe(
      response => {
        music.published = response.data.published;
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

  onSelectMusicType(value: any): void {
    this.selectedMusicType = value;
  }

  selectMusicFile(event: Event): void {
    console.log(event);
    if (event.target) {
      // @ts-ignore
      if ((event.target as HTMLInputElement).files.length > 0) {
        // @ts-ignore
        this.musicFile = (event.target as HTMLInputElement).files.item(0);
        // @ts-ignore
        this.musicFileName = (event.target as HTMLInputElement).files.item(0).name;
      }
    }
  }

  onClickUploadMusic(): void {
    this.musicService.uploadMusic(this.selectedMusic.id, this.selectedMusicType, this.musicFile).subscribe(
      response => {
        console.log(response);
        if (response !== undefined) {
          if (response instanceof HttpResponse) {
            this.selectedMusic.musicUrls = response.body.data;
          } else {
            this.showProgress = true;
            this.progress = response;
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

  onClickAddGenres(): void {
    this.musicService.addMusicGenres(this.selectedGenresEditModal, this.selectedMusic.id).subscribe(
      response => {
        this.selectedMusic.genres = response.data.genres;
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

  onClickDeleteMusicUrl(mUrl: any, music: any): void {
    this.musicService.deleteMusicFile(music.id, mUrl.musicUrlType).subscribe(
      response => {
        for (const m of music.musicUrls) {
          if (m.musicUrlType === mUrl.musicUrlType) {
            console.log(m);
            music.musicUrls.splice(music.musicUrls.indexOf(m), 1);
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

  onClickSaveLyric(value: any): void {
    this.musicService.addLyric(value, this.selectedMusic.id).subscribe(
      response => {
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

  onClickDeleteMusic(): void {
    this.musicService.deleteMusic(this.selectedMusic.id).subscribe(
      response => {
        for (const m of this.musics) {
          if (m.id === this.selectedMusic.id) {
            this.musics.splice(this.musics.indexOf(m), 1);
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
