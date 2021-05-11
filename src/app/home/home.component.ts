import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {of} from 'rxjs';
import {MusicService} from '../service/music.service';
import {SingerService} from '../service/singer.service';
import {AlbumService} from '../service/album.service';
import {GenreService} from '../service/genre.service';
import {MoodService} from '../service/mood.service';
import {PlaylistService} from '../service/playlist.service';
import {LanguageService} from '../service/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCount: number | undefined;
  musicCount: number | undefined;
  singerCount: number | undefined;
  albumCount: number | undefined;
  genreCount: number | undefined;
  moodCount: number | undefined;
  playlistCount: number | undefined;
  languageCount: number | undefined;

  constructor(
    private userService: UserService,
    private musicService: MusicService,
    private singerService: SingerService,
    private albumService: AlbumService,
    private genreService: GenreService,
    private moodService: MoodService,
    private playlistService: PlaylistService,
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserCount().subscribe((data) => {
      this.userCount = data.data;
    });

    this.musicService.getMusicCount().subscribe((data) => {
      this.musicCount = data.data;
    });

    this.singerService.getSingerCount().subscribe((data) => {
      this.singerCount = data.data;
    });

    this.albumService.getAlbumCount().subscribe((data) => {
      this.albumCount = data.data;
    });

    this.genreService.getGenreCount().subscribe((data) => {
      this.genreCount = data.data;
    });

    this.moodService.getMoodCount().subscribe((data) => {
      this.moodCount = data.data;
    });

    this.playlistService.getPlaylistCount().subscribe((data) => {
      this.playlistCount = data.data;
    });

    this.languageService.getLanguageCount().subscribe((data) => {
      this.languageCount = data.data;
    });
  }

}
