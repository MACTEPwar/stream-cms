import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class PlayerSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
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
