import { Nullable } from '@models';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  from,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthHttpService } from '../requests/auth-http.service';
import { gapi, loadGapiInsideDOM } from 'gapi-script';

@Injectable()
export class AuthService {
  currentUserHash$: BehaviorSubject<Nullable<string>> = new BehaviorSubject<
    Nullable<string>
  >(null);
  currentUser$: BehaviorSubject<Nullable<any>> = new BehaviorSubject<
    Nullable<any>
  >(null);

  private auth2: any;

  constructor(private authHttpService: AuthHttpService) {
    this.initGoogleAuth();
  }

  isAuthenticated(): boolean {
    return this.currentUserHash$.getValue() !== null;
  }

  isAuthenticated$(): Observable<boolean> {
    return this.currentUserHash$.pipe(map((m) => m !== null));
  }

  cheackAuth(): void {
    const hash: Nullable<string> = localStorage.getItem('auth');
    if (hash) {
      this.currentUserHash$.next(hash);
    }
  }

  login$(
    username: string,
    password: string,
    rememberMe: boolean = true
  ): Observable<any> {
    return this.authHttpService.login$(username, password).pipe(
      tap((response: any) => {
        const hash: string = response.access_token;
        if (rememberMe) {
          this.rememberMe(hash);
        }
        this.currentUserHash$.next(hash);
      })
    );
  }

  loginGoogle$(rememberMe: boolean = true): Observable<any> {
    return from(this.auth2.signIn() as Promise<any>).pipe(
      switchMap((sw: any) => {
        return this.authHttpService.loginGoogle$(
          this.getAuthResponse().id_token
        );
      }),
      tap((response: any) => {
        const hash: string = response.access_token;
        if (rememberMe) {
          this.rememberMe(hash);
        }
        this.currentUserHash$.next(hash);
      }),
      switchMap((sw) => this.authHttpService.getUserInfo$()),
      tap((ui: any) => {
        this.currentUser$.next(ui);
      })
    );
  }

  getAuthResponse() {
    return this.auth2.currentUser.get().getAuthResponse();
  }

  logout$(): Observable<any> {
    this.currentUserHash$.next(null);
    this.currentUser$.next(null);
    localStorage.removeItem('auth');
    return of(true);
  }

  private rememberMe(hash: string) {
    localStorage.setItem('auth', hash);
  }

  private initGoogleAuth() {
    const CLIENT_ID =
      '198951792604-ac076le1l2kuvtdk0v6lq7ajj29a0r4r.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyA8VnC2f4OJ4K4xDCAMZKPwYF4iTwHwapA';
    const SCOPES = 'profile email';

    loadGapiInsideDOM().then(() => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          })
          .then(() => {
            this.auth2 = gapi.auth2.getAuthInstance();
          });
      });
    });
  }
}
