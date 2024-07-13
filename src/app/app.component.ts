import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './core/app-services/auth.service';
import { Nullable } from './models/t-nullable';
import { Router } from '@angular/router';
import { PlayerSocketService } from '@app-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stream-cms';
  visibleNavs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  visibleSignIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  visiblPersonalArea$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  isAuth$: Observable<boolean>;
  curretnUser$: Observable<Nullable<any>>;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private playerSocketService: PlayerSocketService
  ) {
    this.isAuth$ = this.authService.isAuthenticated$();
    this.curretnUser$ = this.authService.currentUser$;
    this.playerSocketService.onCommand();
  }

  ngOnInit(): void {
    this.setVh();
    this.authService.cheackAuth();

    if (this.authService.isAuthenticated()) {
      this.playerSocketService.onCommand().subscribe((res) => {
        alert('i have messge\n' + JSON.stringify(res, null, 4));
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setVh();
  }

  setVh(): void {
    // Вычисляем высоту видимой области экрана
    const vh = window.innerHeight;
    // Устанавливаем значение CSS-переменной --vh
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  changeVisibleNav(state: boolean): void {
    this.visibleNavs$.next(state);
  }

  signInHandle(): void {
    // this.isAuth = {};
    this.visibleSignIn$.next(false);
    this.router.navigate(['login']);
  }

  signInGoogleHandle(): void {
    this.authService.loginGoogle$().subscribe({
      next: (res) => {
        this.visibleSignIn$.next(false);
        this.cdr.detectChanges();
      },
    });
  }

  logOutHandle(): void {
    // this.isAuth = null;
    this.visiblPersonalArea$.next(false);
    this.authService.logout$();
  }

  test() {
    // alert(123);
    // visiblPersonalArea$.next(!visiblPersonalArea$.getValue())
    this.visiblPersonalArea$.next(!this.visiblPersonalArea$.getValue());

    this.cdr.detectChanges();
  }

  goToPersonalArea(): void {
    this.router.navigate(['personal-area']);
    this.visiblPersonalArea$.next(false);
  }

  navigate(args: string[]): void {
    this.router.navigate(args);
    this.visiblPersonalArea$.next(false);
    this.visibleNavs$.next(false);
  }
}
