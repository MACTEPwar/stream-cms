import { Injectable } from '@angular/core';
import { AdminHttpService } from '../requests/admin-http.service';

@Injectable()
export class AdminService {
  constructor(private adminHttpService: AdminHttpService) {}

  sendConfirmationInviteToRoom(roomId: string): void {
    this.adminHttpService.sendConfirmationInviteToRoom$(roomId).subscribe();
  }
}
