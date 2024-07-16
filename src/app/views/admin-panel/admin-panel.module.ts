import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomsComponent } from './rooms/rooms.component';

import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';

import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [DashboardComponent, RoomsComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    StyleClassModule,
    TableModule,
    MenuModule,
  ],
})
export class AdminPanelModule {}
