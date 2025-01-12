import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomsComponent } from './rooms/rooms.component';

import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';

import { MenuModule } from 'primeng/menu';
import { RoomCardComponent } from './room-card/room-card.component';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AdminPanelComponent } from './admin-panel.component';
import { BreadcrumbService } from '@app-services';
import { CreateRoomModalComponent } from '@partial-views';
import { GetOptionsPipe } from 'src/app/views/admin-panel/rooms/get-options.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    DashboardComponent,
    RoomsComponent,
    RoomCardComponent,
    AdminPanelComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    StyleClassModule,
    TableModule,
    MenuModule,
    ButtonModule,
    BreadcrumbModule,
    CreateRoomModalComponent,
    GetOptionsPipe,
    ProgressSpinnerModule,
  ],
  providers: [BreadcrumbService],
})
export class AdminPanelModule {}
