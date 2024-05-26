import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTemplateDirective } from './directives/template.directive';
import { ButtonComponent } from './components/button/button.component';
import { TitleComponent } from './components/title/title.component';

@NgModule({
  declarations: [AppTemplateDirective, ButtonComponent, TitleComponent],
  imports: [CommonModule],
  exports: [AppTemplateDirective, ButtonComponent, TitleComponent],
})
export class SharedModule {}
