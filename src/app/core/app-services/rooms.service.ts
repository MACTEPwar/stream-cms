import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { RoomsHttpService } from '../requests/rooms-http.service';

@Injectable()
export class RoomsService {
  data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  //   preloader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private roomsHttpService: RoomsHttpService) {}

  refreshData(): void {
    // this.preloader$.next(true);
    this.roomsHttpService.getList$().subscribe({
      next: (res) => {
        // this.preloader$.next(false);
        this.data$.next(res);
      },
      error: (err) => console.error(err),
    });
  }

  getActiveRooms$(): Observable<any> {
    return this.data$;
  }

  create$(model: { name: any }): Observable<any> {
    return this.roomsHttpService.create$(model).pipe(
      tap(() => {
        this.refreshData();
      })
    );
  }

  inviteUserToRoom(roomId: string): Observable<any> {
    return this.roomsHttpService.inviteUserToRoom$(roomId);
  }

  clear$(roomId: string): Observable<any> {
    return this.roomsHttpService.clear$(roomId);
  }
}
