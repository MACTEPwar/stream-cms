import { Injectable } from '@angular/core';
import { AdminHttpService } from '../requests/admin-http.service';

@Injectable()
export class AdminService {
  constructor(private adminHttpService: AdminHttpService) {}

  sendConfirmationToAllUsers(): void {
    this.adminHttpService.sendConfirmationToAllUsers$().subscribe();
  }
}
