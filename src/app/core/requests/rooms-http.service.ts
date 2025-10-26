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

  create$(model: { name: any; settings: any }): Observable<any> {
    return this.httpClient
      .put<any>(`${this.getApiURL()}/rooms/create`, model)
      .pipe(take(1));
  }

  edit$(id: string, model: any): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.getApiURL()}/rooms/${id}`, model)
      .pipe(take(1));
  }

  delete$(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.getApiURL()}/rooms/${id}`)
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

  choosePlayers$(roomId: string): Observable<any> {
    return this.httpClient
      .post<any>(`${this.getApiURL()}/rooms/choosePlayers/${roomId}`, {})
      .pipe(take(1));
  }

  getAvailableRooms$(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.getApiURL()}/rooms/availableRooms`)
      .pipe(take(1));
  }

  setNewLinkForThisRoom$(roomID: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.getApiURL()}/rooms/getRoomLink/${roomID}`)
      .pipe(take(1));
  }

  changeUserStateInRoom$(
    roomID: string,
    state: 'IDLE' | 'SELECTED' | 'CONFIRMED' | 'CANCELED'
  ): Observable<any> {
    return this.httpClient
      .put<any>(`${this.getApiURL()}/rooms/changeUserStateInRoom/${roomID}`, {
        state,
      })
      .pipe(take(1));
  }
}
