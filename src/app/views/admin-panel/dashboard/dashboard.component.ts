import { Component } from '@angular/core';
import { RoomsService } from '@app-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  rooms$: Observable<any[]>;
  constructor(private roomsService: RoomsService) {
    this.rooms$ = this.roomsService.getActiveRooms$();
  }

  ngOnInit(): void {
    this.roomsService.refreshData();
  }
}
