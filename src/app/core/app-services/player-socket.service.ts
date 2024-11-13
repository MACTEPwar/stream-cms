import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ConfigService } from '@core';

@Injectable()
export class PlayerSocketService {
  private socket: Socket;

  constructor(private configService: ConfigService) {
    const url = this.configService.getValue<string>('config', 'apiURL')!;
    this.socket = io(url);
    this.onConnect().subscribe((res) => {
      console.log('connect to socket server');
    });
  }

  public connectToSocket(): void {}

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public onCommand(commanCode: number): Observable<any> {
    return new Observable<string>((observer) => {
      this.socket.on('command', (data: any) => {
        observer.next(data);
      });
    }).pipe(
      filter((f: any) => f.code === commanCode),
      map((m) => m.data)
    );
  }

  public onConnect(): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.on('connect', () => {
        observer.next();
      });
    });
  }

  public onDisconnect(): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }
}
