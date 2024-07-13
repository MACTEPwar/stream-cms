import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminHttpService } from './admin-http.service';
import { DonatersHttpService } from './donaters-http.service';
import { ScheduleHttpService } from './schedule-http.service';

@NgModule({
  imports: [CommonModule],
  providers: [ScheduleHttpService, DonatersHttpService, AdminHttpService],
})
export class RequestsModule {}
