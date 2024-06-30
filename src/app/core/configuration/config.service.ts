import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, tap } from 'rxjs';

@Injectable()
export class ConfigService {
  settings: { key: string; value: any }[] = [];

  constructor(private http: HttpClient) {}

  load(): Observable<any> {
    return forkJoin([this.loadConfigFile$()]);
  }

  private loadConfigFile$(): Observable<any> {
    return this.http
      .get('./assets/config.json', {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        tap((t) => {
          this.settings.push({ key: 'config', value: JSON.stringify(t) });
        })
      );
  }

  getValue<T = any>(...args: any): T | null {
    let res = this.settings.find((i) => i.key === args[0])?.value;
    res = !res ? null : JSON.parse(res);

    args.shift();

    if (res && args.length > 0) {
      for (let aaa of args) {
        res = res[aaa];
      }
    }

    res = !res ? null : (res as T);

    return res;
  }
}
