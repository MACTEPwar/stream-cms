import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '@app-services';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EditRoomModalComponent } from 'src/app/shared/partial-views/edit-room-modal copy/edit-room-modal.component';

@Pipe({
  name: 'getOptions',
  standalone: true,
})
export class GetOptionsPipe implements PipeTransform {
  constructor(
    private router: Router,
    private roomsService: RoomsService,
    private dialogService: DialogService
  ) {}

  transform(value: any): MenuItem[] {
    return [
      {
        label: 'Переглянути',
        icon: 'pi pi-eye',
        command: () => {
          this.router.navigate(['admin-panel', 'rooms', value.id]);
        },
      },
      {
        label: 'Редагувати',
        icon: 'pi pi-edit',
        command: () => {
          this.dialogService.open(EditRoomModalComponent, {
            width: '800px',
            header: 'Редагування кiмнати',
            data: {
              room: value,
            },
          });
        },
      },
      {
        label: 'Видалити',
        icon: 'pi pi-trash',
        command: () => {
          this.roomsService.delete$(value.id).subscribe();
        },
      },
    ];
  }
}
