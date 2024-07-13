import { Injectable } from '@angular/core';
import { ABaseHttpService } from './a-base-http.directive';
import { ConfigService } from '@core';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// @Injectable()
// export class AuthHttpService {
//   constructor(
//     // protected configService: ConfigService,
//     private httpClient: HttpClient
//   ) {}
// }
@Injectable()
export class AuthHttpService extends ABaseHttpService {
  constructor(
    protected override configService: ConfigService,
    private httpClient: HttpClient
  ) {
    super(configService);
  }

  registration$(registrationForm: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/auth/registration`, registrationForm)
      .pipe(take(1));
  }

  login$(username: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/auth/login`, {
        username,
        password,
      })
      .pipe(take(1));
  }

  loginGoogle$(token: string): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/auth/google/login`, { idToken: token })
      .pipe(take(1));
  }

  getUserInfo$(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.getApiURL()}/users/infoAuthUser`)
      .pipe(take(1));
  }
}
