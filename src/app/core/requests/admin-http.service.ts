import { Injectable } from '@angular/core';
import { ABaseHttpService } from './a-base-http.directive';
import { Observable, take } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminHttpService extends ABaseHttpService {
  constructor(
    protected override configService: ConfigService,
    private httpClient: HttpClient
  ) {
    super(configService);
  }

  sendConfirmationToAllUsers$(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.getApiURL()}/admin/sendConfirmationToAllUsers`)
      .pipe(take(1));
  }
}
