import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { AuthService } from './core/app-services/auth.service';
import { Nullable } from './models/t-nullable';
import { Router } from '@angular/router';
import { PlayerSocketService, RoomsService } from '@app-services';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private playerSocketService: PlayerSocketService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private roomsService: RoomsService
  ) {
    this.isAuth$ = this.authService.isAuthenticated$();
    this.curretnUser$ = this.authService.currentUser$;
    // this.playerSocketService.onCommand();
  }

  private commandSubscription: Subscription | null = null;
  private currentUserSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.setVh();
    this.authService.cheackAuth();

    // this.currentUserSubscription = this.authService.currentUser$.subscribe(
    //   (currentUser) => {
    //     if (currentUser) {
    //       this.subscribeToCommand();
    //     } else {
    //       this.unsubscribeFromCommand();
    //     }
    //   }
    // );

    // if (this.authService.isAuthenticated()) {
    //   this.subscribeToCommand();
    // }
    this.commandSubscription = this.playerSocketService
      .onCommand(0)
      .subscribe((res) => {
        this.proccessCommandInveiteToRoom(res);
      });
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

  private proccessCommandInveiteToRoom(data: any): void {
    const invite_to_room: boolean = JSON.parse(
      this.authService.currentUser$
        .getValue()
        .settings.find((f: any) => f.key === 'invite_to_room').defaultValue
    );
    if (this.authService.isAuthenticated() && invite_to_room) {
      // alert('I have message\n' + JSON.stringify(data, null, 4));
      this.confirmationService.confirm({
        header: 'Инфо',
        message: 'Вы желаете учавствать в кастомке?',
        accept: () => {
          this.roomsService
            .inviteUserToRoom(data.roomId)
            .pipe(take(1))
            .subscribe();
          alert(JSON.stringify(data, null, 4));

          this.messageService.add({
            severity: 'success',
            summary: 'Инфо',
            detail: 'Вы были добавлены в список на отбор в лобби.',
          });
        },
        reject: () => {},
      });
    }
  }

  ngOnDestroy(): void {}
}
