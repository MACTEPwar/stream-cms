import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTemplateDirective } from './directives/template.directive';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [AppTemplateDirective, ButtonComponent],
  imports: [CommonModule],
  exports: [AppTemplateDirective, ButtonComponent],
})
export class SharedModule {}
