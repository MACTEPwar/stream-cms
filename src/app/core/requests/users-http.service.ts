import { Injectable } from '@angular/core';
import { ABaseHttpService } from './a-base-http.directive';
import { ConfigService } from '../configuration/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable()
export class UsersHttpService extends ABaseHttpService {
  constructor(
    protected override configService: ConfigService,
    private httpClient: HttpClient
  ) {
    super(configService);
  }

  getList$(where: any = {}, include: any = {}): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/users`, { where, include })
      .pipe(take(1));
  }
}
