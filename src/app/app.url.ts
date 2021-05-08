export class AppUrl {
  public static readonly BASE_URL = 'http://localhost:8080/api';
  public static readonly V = AppUrl.BASE_URL + '/v1';
  public static readonly ANONYMOUS = AppUrl.V + '/anonymous';
  public static readonly CONSUMER = AppUrl.V + '/consumer';
  public static readonly LOGIN = AppUrl.ANONYMOUS + '/users/login';
  public static readonly PROFILE = AppUrl.CONSUMER + '/profile';
}
