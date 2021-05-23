import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../service/language.service';
import {AlertService} from '../service/alert.service';
import {ErrorResponse} from '../model/error-response';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  languages: Array<any> = [];
  totalPages: any;
  currentPage: any;
  first: any;
  last: any;
  show: any;
  selectedLanguage: any;

  constructor(private languageService: LanguageService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe(
      response => {
        this.languages = response.data.content;
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

  onClickPage(page: any): void {
    this.languageService.getLanguages(page).subscribe(
      response => {
        this.languages = response.data.content;
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

  onAddLanguage(language: string): void {
    this.languageService.addLanguage(language).subscribe(
      response => {
        this.languages.push(response.data);
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

  onSelect(language: any): void{
    this.selectedLanguage = language;
  }

  onClickEditLanguage(language: string): void {

    this.languageService.editLanguage(language, this.selectedLanguage.id).subscribe(
      response => {
        console.log(response);
        this.selectedLanguage.name = language;
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
    this.languageService.deleteLanguage(this.selectedLanguage.id).subscribe(
      response => {
        console.log(response);
        for (const language of this.languages) {
          if (this.selectedLanguage.id === language.id) {
            this.languages.splice(this.languages.indexOf(language), 1);
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
