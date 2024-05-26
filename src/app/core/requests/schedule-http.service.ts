import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ScheduleHttpService {
  getShedule$(): Observable<any> {
    return of([
      {
        dayOfWeek: 'Пн.',
        content: 'Оффлайн',
        time: null,
      },
      {
        dayOfWeek: 'Вт.',
        content: 'ПК игры: Resident Evil',
        time: '21:00',
      },
      {
        dayOfWeek: 'Ср.',
        content: 'MLBB: Рейтинг',
        time: '21:00',
      },
      {
        dayOfWeek: 'Чт.',
        content: 'Оффлайн',
        time: null,
      },
      {
        dayOfWeek: 'Пт.',
        content: 'MLBB: Рандомный турнир',
        time: '21:00',
      },
      {
        dayOfWeek: 'Сб.',
        content: 'MLBB: Кастомки - РСИКК',
        time: '21:00',
      },
      {
        dayOfWeek: 'Вс.',
        content: 'Оффлайн',
        time: null,
      },
    ]);
  }
}
