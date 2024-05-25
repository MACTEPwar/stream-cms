import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SButtonComponent } from './s-button.component';
import { BgMainComponent } from './bg-main/bg-main.component';
import { BgMainLeftAngleComponent } from './bg-main/defs/bg-main-left-angle/bg-main-left-angle.component';
import { BgMainRightAngleComponent } from './bg-main/defs/bg-main-right-angle/bg-main-right-angle.component';
import { BgMainFilterComponent } from './bg-main/defs/bg-main-filter/bg-main-filter.component';

@NgModule({
  declarations: [SButtonComponent, BgMainComponent, BgMainLeftAngleComponent, BgMainRightAngleComponent, BgMainFilterComponent],
  imports: [CommonModule],
  exports: [SButtonComponent],
})
export class SButtonModule {}
