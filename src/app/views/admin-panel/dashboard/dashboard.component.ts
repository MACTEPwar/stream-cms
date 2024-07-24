import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  BreadcrumbBuilder,
  BreadcrumbService,
  EBreadcrumb,
  RoomsService,
} from '@app-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  rooms$: Observable<any[]>;
  constructor(
    private roomsService: RoomsService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.rooms$ = this.roomsService.getActiveRooms$();

    this.breadcrumbService.setItems(
      new BreadcrumbBuilder()
        .newBreadcrumb()
        .addBreadcrumb(EBreadcrumb.HOME)
        .apply()
    );
  }

  ngOnInit(): void {
    this.roomsService.refreshData();
  }

  showRoom(id: string): void {
    this.router.navigate(['admin-panel', 'rooms', id]);
  }
}
