import { BehaviorSubject, Observable, map } from 'rxjs';
import { ScheduleHttpService } from './../requests/schedule-http.service';
import { Injectable } from '@angular/core';
import { SheduleItem } from '@models';
import { ListItem } from 'src/app/shared/components/list/list-item';
import { DonatersHttpService } from '../requests/donaters-http.service';

@Injectable()
export class DonatersService {
  topDonaters$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    []
  );

  constructor(private donatersHttpService: DonatersHttpService) {}

  loadDonaters(): void {
    this.donatersHttpService.getTopDonaters$().subscribe((res) => {
      this.topDonaters$.next(res);
    });
  }

  getTopDonatersForListComponent$(): Observable<Array<ListItem>> {
    return this.topDonaters$.pipe(
      map((m) => {
        return m.map((mm, i) => ({
          leftLabel: {
            content: mm.sum ?? '',
            width: 150,
            color: 'white',
          },
          // leftLabel: null,
          //   rightLabel: {
          //     content: mm.time ?? '--:--',
          //     width: 163,
          //     color: 'white',
          //   },
          rightLabel: null,
          content: {
            content: mm.name ?? '',
            width: null,
            color: 'white',
          },
          diraction: 'right',
        }));
      })
    );
  }
}
