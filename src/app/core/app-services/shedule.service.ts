import { BehaviorSubject, Observable, map } from 'rxjs';
import { ScheduleHttpService } from './../requests/schedule-http.service';
import { Injectable } from '@angular/core';
import { SheduleItem } from '@models';
import { ListItem } from 'src/app/shared/components/list/list-item';

@Injectable()
export class SheduleService {
  shedule$: BehaviorSubject<Array<SheduleItem>> = new BehaviorSubject<
    Array<SheduleItem>
  >([]);

  constructor(private scheduleHttpService: ScheduleHttpService) {}

  loadShedule(): void {
    this.scheduleHttpService.getShedule$().subscribe((res) => {
      this.shedule$.next(res);
    });
  }

  getSheduleForListComponent$(): Observable<Array<ListItem>> {
    return this.shedule$.pipe(
      map((m) => {
        return m.map((mm, i) => ({
          leftLabel: {
            content: mm.dayOfWeek ?? '',
            // width: 150,
            width: 100,
            color: 'white',
          },
          // leftLabel: null,
          rightLabel: {
            content: mm.time ?? '--:--',
            width: 103,
            color: 'white',
          },
          // rightLabel: null,
          content: {
            content: mm.content ?? '',
            width: null,
            color: mm.content === 'Оффлайн' ? 'red' : 'white',
          },
          // diraction: i % 2 === 0 ? 'left' : 'right',
          diraction: 'left',
        }));
      })
    );
  }
}
