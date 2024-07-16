import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, RoomsService } from '@app-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
 
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {
    
  }

  createRoom(): void {
    const rand = new Date().getTime();
    // this.roomsService.create({
    //   name: {
    //     uk: `Кiмната ${rand}`,
    //     ru: `Комната ${rand}`,
    //   },
    // });
  }

  sendConfirmationToAllUsers(): void {
    this.adminService.sendConfirmationToAllUsers();
  }

  navigate(commands: any[]): void {
    this.router.navigate(commands);
  }
}
