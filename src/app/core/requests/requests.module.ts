import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduleHttpService } from './schedule-http.service';

@NgModule({
  imports: [CommonModule],
  providers: [ScheduleHttpService],
})
export class RequestsModule {}
