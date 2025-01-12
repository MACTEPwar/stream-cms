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

  create$(model: { name: any; settings: any }): Observable<any> {
    return this.roomsHttpService.create$(model).pipe(
      tap(() => {
        this.refreshData();
      })
    );
  }

  edit$(id: string, model: any): Observable<any> {
    return this.roomsHttpService.edit$(id, model).pipe(
      tap(() => {
        this.refreshData();
      })
    );
  }

  delete$(id: string): Observable<any> {
    return this.roomsHttpService.delete$(id).pipe(
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

  getAvailableRooms$(): Observable<any> {
    return this.roomsHttpService.getAvailableRooms$();
  }
}
