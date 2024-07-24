import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BreadcrumbService {
  items$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  //   private _breadcrumbBuilder: BreadcrumbBuilder = new BreadcrumbBuilder();
  //   public get breadcrumbBuilder(): BreadcrumbBuilder {
  //     return this._breadcrumbBuilder;
  //   }

  constructor() {}

  setItems(items: MenuItem[]): void {
    this.items$.next(items);

    console.log('bc', this.items$.getValue());
  }
}

export class BreadcrumbBuilder {
  breadcrumbs: MenuItem[] = [];

  newBreadcrumb(): BreadcrumbBuilder {
    this.breadcrumbs = [];
    return this;
  }

  addBreadcrumb(bc: EBreadcrumb, data: any = null): BreadcrumbBuilder {
    const func: ((data: any) => MenuItem) | null = MBreadcrumb.get(bc) ?? null;
    if (func) {
      this.breadcrumbs.push(func(data));
    }
    return this;
  }

  apply(): MenuItem[] {
    return this.breadcrumbs;
  }
}

export enum EBreadcrumb {
  HOME,
  ROOMS,
  ROOM,
}

export const MBreadcrumb: Map<EBreadcrumb, (data: any) => MenuItem> = new Map<
  EBreadcrumb,
  (data: any) => MenuItem
>([
  [
    EBreadcrumb.HOME,
    (data) => ({
      icon: 'pi pi-home',
      route: '/admin-panel',
      url: '/admin-panel',
    }),
  ],
  [
    EBreadcrumb.ROOMS,
    (data) => ({ route: '/rooms', url: 'rooms', label: 'Комнаты' }),
  ],
  [
    EBreadcrumb.ROOM,
    (data) => ({
      route: '/rooms',
      url: 'rooms',
      label: `Комната ${data.roomName.uk}`,
    }),
  ],
]);
