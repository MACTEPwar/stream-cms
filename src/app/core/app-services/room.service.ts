import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry, switchMap, tap } from 'rxjs';
import { RoomsHttpService } from '../requests/rooms-http.service';
import { UsersHttpService } from '../requests/users-http.service';

@Injectable()
export class RoomService {
  public room$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public users$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public get roomId(): string {
    return this.room$.getValue().id;
  }

  public get roomName(): any {
    return this.room$.getValue().name;
  }

  constructor(
    private roomsHttpService: RoomsHttpService,
    private usersHttpService: UsersHttpService
  ) {}

  loadRoom$(roomId: string): Observable<any> {
    return this.roomsHttpService.getById$(roomId).pipe(
      tap({
        next: (room) => {
          this.room$.next(room);
        },
      })
    );
  }

  inviteUser(user: any): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  loadUsers$(): Observable<any> {
    return this.usersHttpService
      .getList$(
        {
          rooms: {
            some: {
              id: this.roomId,
            },
          },
        },
        {
          userInfo: {
            include: {
              bindings: true,
            },
          },
          roles: true,
          accounts: true,
          userSettings: {
            include: {
              setting: true,
            },
          },
          settings: true,
        }
      )
      .pipe(
        tap({
          next: (users) => {
            this.users$.next(users);
          },
        })
      );
  }

  clear$(): Observable<any> {
    return this.roomsHttpService
      .clear$(this.roomId)
      .pipe(switchMap((sw) => this.loadUsers$()));
  }
}
