import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomsService } from '@app-services';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.scss',
})
export class AvailableRoomsComponent {
  availableRooms$;

  constructor(private roomsService: RoomsService) {
    this.availableRooms$ = this.roomsService.getAvailableRooms$();
  }

  ngOnInit(): void {}
}
