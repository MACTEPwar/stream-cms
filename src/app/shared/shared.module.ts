import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTemplateDirective } from './directives/template.directive';
import { ButtonComponent } from './components/button/button.component';
import { TitleComponent } from './components/title/title.component';
import { ListModule } from './components/list/list.module';
import { AppHasRoleDirective } from './directives/has-role.directive';

@NgModule({
  declarations: [
    AppTemplateDirective,
    ButtonComponent,
    TitleComponent,
    AppHasRoleDirective,
  ],
  imports: [CommonModule, ListModule],
  exports: [
    AppTemplateDirective,
    ButtonComponent,
    TitleComponent,
    ListModule,
    AppHasRoleDirective,
  ],
})
export class SharedModule {}
