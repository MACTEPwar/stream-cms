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
        return m.map((mm) => ({
          startLabel: {
            content: mm.time ?? '--:--',
            width: 84,
            color: 'white',
          },
          endLabel: {
            content: mm.dayOfWeek ?? '',
            width: null,
            color: 'white',
          },
          content: {
            content: mm.content ?? '',
            width: 84,
            color: mm.content === 'Оффлайн' ? 'red' : 'white',
          },
        }));
      })
    );
  }
}
