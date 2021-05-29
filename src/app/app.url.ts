export class AppUrl {
  public static readonly BASE_URL = 'http://localhost:8080/api';
  public static readonly V = AppUrl.BASE_URL + '/v1';

  public static readonly ANONYMOUS = AppUrl.V + '/anonymous';
  public static readonly CONSUMER = AppUrl.V + '/consumer';
  public static readonly ADMIN = AppUrl.V + '/admin';
  public static readonly DEVELOPER = AppUrl.V + '/developer';

  public static readonly LOGIN = AppUrl.ANONYMOUS + '/users/login';
  public static readonly LOGOUT = AppUrl.ANONYMOUS + '/users/logout';
  public static readonly NEW_TOKEN = AppUrl.ANONYMOUS + '/users/new-token';

  public static readonly PROFILE = AppUrl.CONSUMER + '/profile';
  public static readonly PROFILE_AVATAR = AppUrl.CONSUMER + '/profile/avatar';

  public static readonly MUSIC_COUNT = AppUrl.ADMIN + '/music/count';
  public static readonly MUSIC = AppUrl.ADMIN + '/music';
  public static readonly MUSIC_UPLOAD = AppUrl.ADMIN + '/music/upload';
  public static readonly MUSIC_GENRE = AppUrl.ADMIN + '/music/genre';
  public static readonly MUSIC_DELETE_FILE = AppUrl.ADMIN + '/music/deleteMusic';
  public static readonly MUSIC_PUBLISH = AppUrl.ADMIN + '/music/publish';
  public static readonly MUSIC_LYRIC = AppUrl.ADMIN + '/music/lyric';


  public static readonly SINGER_COUNT = AppUrl.ADMIN + '/singer/count';
  public static readonly SINGER = AppUrl.ADMIN + '/singer';
  public static readonly SINGER_ALL = AppUrl.ADMIN + '/singer/all';


  public static readonly ALBUM_COUNT = AppUrl.ADMIN + '/album/count';
  public static readonly ALBUM = AppUrl.ADMIN + '/album';
  public static readonly ALBUM_ALL = AppUrl.ADMIN + '/album/all';


  public static readonly GENRE_COUNT = AppUrl.ADMIN + '/genre/count';
  public static readonly GENRE = AppUrl.ADMIN + '/genre';
  public static readonly GENRE_ALL = AppUrl.ADMIN + '/genre/all';


  public static readonly MOOD_COUNT = AppUrl.ADMIN + '/mood/count';
  public static readonly MOOD = AppUrl.ADMIN + '/mood';


  public static readonly LANGUAGE_COUNT = AppUrl.ADMIN + '/language/count';
  public static readonly LANGUAGE = AppUrl.ADMIN + '/language';
  public static readonly LANGUAGE_ALL = AppUrl.ADMIN + '/language/all';


  public static readonly PLAYLIST_COUNT = AppUrl.ADMIN + '/playlist/count';

  public static readonly USER_COUNT = AppUrl.ADMIN + '/user/count';
  public static readonly USERS = AppUrl.DEVELOPER + '/users';
  public static readonly USERS_CHANGE_ACTIVATION = AppUrl.DEVELOPER + '/users/changeActivate';

  public static readonly ROLES = AppUrl.DEVELOPER + '/role';
  public static readonly SET_ROLES = AppUrl.DEVELOPER + '/users/userRoles';
}
