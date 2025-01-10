import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  BreadcrumbBuilder,
  BreadcrumbService,
  EBreadcrumb,
  RoomsService,
} from '@app-services';
import { CreateRoomModalComponent } from '@partial-views';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { RoomsComponent } from 'src/app/views/admin-panel/rooms/rooms.component';
import { NotFoundComponent } from 'src/app/views/not-found/not-found.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DialogService],
})
export class DashboardComponent {
  rooms$: Observable<any[]>;
  ref: DynamicDialogRef | undefined;
  constructor(
    private roomsService: RoomsService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService
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

  showModalForCreateRoom(): void {
    this.ref = this.dialogService.open(CreateRoomModalComponent, {
      header: 'Нова кiмната',
      width: '600px',
    });
  }
}
