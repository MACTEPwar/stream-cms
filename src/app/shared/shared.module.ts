import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTemplateDirective } from './directives/template.directive';

@NgModule({
  declarations: [AppTemplateDirective],
  imports: [CommonModule],
  exports: [AppTemplateDirective],
})
export class SharedModule {}
