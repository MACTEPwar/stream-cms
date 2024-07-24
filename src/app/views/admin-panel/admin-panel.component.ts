import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AdminService,
  BreadcrumbBuilder,
  BreadcrumbService,
  EBreadcrumb,
  RoomsService,
} from '@app-services';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  items$: Observable<MenuItem[]>;
  // home: MenuItem | undefined;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.items$ = this.breadcrumbService.items$;
  }

  ngOnInit(): void {
    // this.items = [
    //   { icon: 'pi pi-home', route: '/installation', url: 'dashboard' },
    //   { label: 'Components' },
    //   { label: 'Form' },
    //   { label: 'InputText', route: '/inputtext' },
    // ];

    this.breadcrumbService.setItems(
      new BreadcrumbBuilder()
        .newBreadcrumb()
        .addBreadcrumb(EBreadcrumb.HOME)
        .apply()
    );
  }

  createRoom(): void {
    const rand = new Date().getTime();
    // this.roomsService.create({
    //   name: {
    //     uk: `Кiмната ${rand}`,
    //     ru: `Комната ${rand}`,
    //   },
    // });
  }

  navigate(commands: any[]): void {
    this.router.navigate(commands);
  }
}
