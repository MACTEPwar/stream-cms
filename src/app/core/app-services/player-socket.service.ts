import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public onCommand(): Observable<any> {
    return new Observable<string>((observer) => {
      this.socket.on('command', (data: any) => {
        observer.next(data);
      });
    });
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
