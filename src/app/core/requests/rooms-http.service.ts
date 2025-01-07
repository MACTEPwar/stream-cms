import { Injectable } from '@angular/core';
import { ABaseHttpService } from './a-base-http.directive';
import { Observable, take } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomsHttpService extends ABaseHttpService {
  constructor(
    protected override configService: ConfigService,
    private httpClient: HttpClient
  ) {
    super(configService);
  }

  getList$(where: any = {}, include: any = {}): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/rooms`, { where, include })
      .pipe(take(1));
  }

  getById$(id: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.getApiURL()}/rooms/${id}`)
      .pipe(take(1));
  }

  create$(model: { name: any }): Observable<any> {
    return this.httpClient
      .put<any>(`${this.getApiURL()}/rooms/create`, model)
      .pipe(take(1));
  }

  inviteUserToRoom$(roomId: string): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/rooms/addUserToRoom`, {
        roomId,
      })
      .pipe(take(1));
  }

  clear$(roomId: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.getApiURL()}/rooms/clear/${roomId}`)
      .pipe(take(1));
  }

  choosePlayers$(roomId: string, options: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/rooms/choosePlayers/${roomId}`, options)
      .pipe(take(1));
  }
}
