import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AdminService,
  BreadcrumbBuilder,
  BreadcrumbService,
  EBreadcrumb,
  PlayerSocketService,
  RoomService,
  RoomsService,
} from '@app-services';
import { SocketMesssageCode } from '@models';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { RoomsHttpService } from 'src/app/core/requests/rooms-http.service';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
  providers: [],
})
export class RoomCardComponent {
  preloader = true;
  room$: Observable<any>;
  users$: Observable<any[]>;
  untilSubsFlag$: Subject<void> = new Subject<void>();

  userOptions = [];
  roomOptions: MenuItem[] = [
    {
      label: 'Собрать желающих',
      command: () => {
        this.sendConfirmationToAllUsers();
      },
    },
    {
      label: 'Запустить рандомайзер',
      command: () => {
        const currentRoom = this.roomService.room$.getValue();

        this.roomService.setNewLinkForThisRoom$().subscribe((res) => {
          this.confirmationService.confirm({
            header: 'ЖДУ ССЫЛКУ',
            message:
              'Окно закроется автоматически после обработки ссылки из бота.',
            acceptVisible: false,
            rejectLabel: 'Вiдмiнити',
            reject: () => {
              alert('Отменяю ввод ссылки');
            },
          });
        });
      },
    },
    {
      label: 'Очитстиь комнату',
      command: () => {
        this.roomService.clear$().subscribe();
      },
    },
  ];

  constructor(
    private roomService: RoomService,
    private roomsHttpService: RoomsHttpService,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private playerSocketService: PlayerSocketService,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService
  ) {
    this.room$ = this.roomService.room$;
    this.users$ = this.roomService.users$;

    this.route.paramMap
      .pipe(
        switchMap((sw: any) => {
          this.preloader = true;
          return this.roomService.loadRoom$(sw.get('id'));
        }),
        switchMap((sw) => this.roomService.loadUsers$())
      )
      .subscribe((params: any) => {
        this.preloader = false;
        this.breadcrumbService.setItems(
          new BreadcrumbBuilder()
            .newBreadcrumb()
            .addBreadcrumb(EBreadcrumb.HOME)
            .addBreadcrumb(EBreadcrumb.ROOMS)
            .addBreadcrumb(EBreadcrumb.ROOM, {
              roomName: this.roomService.roomName,
            })
            .apply()
        );
      });

    this.playerSocketService
      .onCommand(SocketMesssageCode.Room.InvitedUserToRoom.code)
      .pipe(takeUntil(this.untilSubsFlag$))
      .subscribe({
        next: (res) => {
          // console.log('InvitedUser', res);
          // alert(JSON.stringify(res.user, null, 4));
          this.roomService.inviteUser(res.user);
        },
        error: (err) => {
          console.warn(err);
        },
      });
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems(
      new BreadcrumbBuilder()
        .newBreadcrumb()
        .addBreadcrumb(EBreadcrumb.HOME)
        .addBreadcrumb(EBreadcrumb.ROOMS)
        .apply()
    );
  }

  ngOnDestroy(): void {
    this.untilSubsFlag$.next();
    this.untilSubsFlag$.complete();
  }

  sendConfirmationToAllUsers(): void {
    this.adminService.sendConfirmationInviteToRoom(this.roomService.roomId);
  }
}
