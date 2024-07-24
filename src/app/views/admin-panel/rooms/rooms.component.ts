import { Component } from '@angular/core';
import {
  BreadcrumbBuilder,
  BreadcrumbService,
  EBreadcrumb,
  RoomsService,
} from '@app-services';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
  rooms$: Observable<any[]>;
  itemOptions: MenuItem[] | undefined;

  constructor(
    private roomsService: RoomsService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.rooms$ = this.roomsService.data$;
  }

  ngOnInit(): void {
    this.roomsService.refreshData();

    this.itemOptions = [
      {
        label: 'Переглянути',
        icon: 'pi pi-eye',
      },
    ];

    this.breadcrumbService.setItems(
      new BreadcrumbBuilder()
        .newBreadcrumb()
        .addBreadcrumb(EBreadcrumb.HOME)
        .addBreadcrumb(EBreadcrumb.ROOMS)
        .apply()
    );
  }
}
