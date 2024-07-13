import { Nullable } from '@models';
import { Injectable, InjectionToken } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
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
  roles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  currentUserHash$: BehaviorSubject<Nullable<string>> = new BehaviorSubject<
    Nullable<string>
  >(null);
  currentUser$: BehaviorSubject<Nullable<any>> = new BehaviorSubject<
    Nullable<any>
  >(null);

  private auth2: any;

  constructor(private authHttpService: AuthHttpService) {
    this.initGoogleAuth();
    // this.roles = this.currentUser$.pipe(
    //   map((m) => {
    //     m.roles.map((mm) => mm.key);
    //   })
    // );
  }

  userHasRole$(roleKey: string): Observable<boolean> {
    return this.currentUser$.pipe(
      filter((f) => f !== null),
      map((m) => {
        const roles: string[] = m.roles.map((mm: any) => mm.key);
        return roles.includes(roleKey);
      })
    );
  }

  userHasRole(roleKey: string): boolean {
    return (
      this.currentUser$
        .getValue()
        ?.roles?.map((mm: any) => mm.key)
        ?.includes(roleKey) ?? false
    );
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
      this.refreshUserInfo$().subscribe();
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
      }),
      switchMap((sw) => this.refreshUserInfo$())
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
      switchMap((sw) => this.refreshUserInfo$())
    );
  }

  registration$(registrationForm: any): Observable<any> {
    return this.authHttpService.registration$(registrationForm);
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

  public refreshUserInfo$(): Observable<any> {
    return this.authHttpService.getUserInfo$().pipe(
      tap((ui: any) => {
        this.currentUser$.next(ui);
      })
    );
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

// export const ROLES_IT = new InjectionToken<string[]>('ROLES');
