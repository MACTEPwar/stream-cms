import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app-services';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  sendConfirmationToAllUsers(): void {
    this.adminService.sendConfirmationToAllUsers();
  }
}
