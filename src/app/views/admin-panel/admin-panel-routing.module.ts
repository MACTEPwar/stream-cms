import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './admin-panel.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomCardComponent } from './room-card/room-card.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'rooms',
        component: RoomsComponent,
      },
      {
        path: 'rooms/:id',
        component: RoomCardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
