import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoomsService } from '@app-services';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import {
  DynamicDialogRef,
  DynamicDialogModule,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { filter, of, switchMap, take } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-room-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './edit-room-modal.component.html',
  styleUrl: './edit-room-modal.component.scss',
})
export class EditRoomModalComponent {
  inviteModeOptions = [
    {
      label: 'Доки активна',
      value: 0,
    },
    {
      label: 'За кнопкою',
      value: 1,
    },
    {
      label: 'Вимкнено',
      value: 2,
    },
  ];

  private random = new Date().getTime();

  profileForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormGroup({
      uk: new FormControl(this.random, Validators.required),
      ru: new FormControl(this.random, Validators.required),
    }),
    settings: new FormGroup({
      needRandomPlayers: new FormControl(2, Validators.required),
      inviteMode: new FormControl(0, Validators.required),
      state: new FormControl(),
    }),
  });

  constructor(
    private roomsService: RoomsService,
    private messageService: MessageService,
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.profileForm.patchValue(this.dynamicDialogConfig.data.room);
  }

  edit(): void {
    of(this.profileForm.valid)
      .pipe(
        filter((f) => f === true),
        switchMap((sw) =>
          this.roomsService.edit$(
            this.profileForm.get('id')?.value!,
            this.profileForm.getRawValue()
          )
        ),
        take(1)
      )
      .subscribe({
        next: (res) => {
          this.dynamicDialogRef.close();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Помилка',
            detail: 'Помилка створення кiмнати',
          });
        },
      });
  }

  close(): void {
    this.dynamicDialogRef.close();
  }
}
