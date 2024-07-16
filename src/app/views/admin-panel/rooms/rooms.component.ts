import { Component } from '@angular/core';
import { RoomsService } from '@app-services';
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

  constructor(private roomsService: RoomsService) {
    this.rooms$ = this.roomsService.data$;
  }

  ngOnInit(): void {
    this.roomsService.refreshData();

    this.itemOptions = [
      {
        label: 'Переглянути',
        icon: 'pi pi-eye'
      },
    ];
  }
}
