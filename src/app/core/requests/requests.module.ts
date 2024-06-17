import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduleHttpService } from './schedule-http.service';
import { DonatersHttpService } from './donaters-http.service';

@NgModule({
  imports: [CommonModule],
  providers: [ScheduleHttpService, DonatersHttpService],
})
export class RequestsModule {}
