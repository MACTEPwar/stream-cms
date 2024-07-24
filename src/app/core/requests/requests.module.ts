import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminHttpService } from './admin-http.service';
import { DonatersHttpService } from './donaters-http.service';
import { ScheduleHttpService } from './schedule-http.service';
import { RoomsHttpService } from './rooms-http.service';
import { UsersHttpService } from './users-http.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ScheduleHttpService,
    DonatersHttpService,
    AdminHttpService,
    RoomsHttpService,
    UsersHttpService,
  ],
})
export class RequestsModule {}
