import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduleHttpService } from './schedule-http.service';
import { DonatersHttpService } from './donaters-http.service';
import { AuthHttpService } from './auth-http.service';
import { ConfigService } from '../configuration/config.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  providers: [
    ScheduleHttpService,
    DonatersHttpService,

    // AuthHttpService
  ],
})
export class RequestsModule {}
