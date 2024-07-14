import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  create(model: { name: any }): void {
    this.roomsHttpService.create$(model).subscribe({
      next: (res) => {
        this.refreshData();
      },
      error: (err) => {},
    });
  }
}
