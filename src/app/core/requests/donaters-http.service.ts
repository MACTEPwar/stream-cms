import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DonatersHttpService {
  getTopDonaters$(): Observable<any> {
    return of([
      { name: 'Лексик:3', sum: '79,816₴' },
      { name: '-=AnGeŁ=-', sum: '18,850₴' },
      { name: 'Михайло', sum: '17,319₴' },
      { name: 'D.I.G.G.I', sum: '11,160₴' },
      { name: 'D.I.I.G.I', sum: '4,644₴' },
    ]);
  }
}
