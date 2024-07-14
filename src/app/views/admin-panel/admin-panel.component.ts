import { Component, OnInit } from '@angular/core';
import { AdminService, RoomsService } from '@app-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  rooms$: Observable<any[]>;
  constructor(
    private adminService: AdminService,
    private roomsService: RoomsService
  ) {
    this.rooms$ = this.roomsService.data$;
  }

  ngOnInit(): void {
    this.roomsService.refreshData();
  }

  createRoom(): void {
    const rand = new Date().getTime();
    this.roomsService.create({
      name: {
        uk: `Кiмната ${rand}`,
        ru: `Комната ${rand}`,
      },
    });
  }

  sendConfirmationToAllUsers(): void {
    this.adminService.sendConfirmationToAllUsers();
  }
}
