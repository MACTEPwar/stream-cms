import { TemplateRef } from '@angular/core';
import { Nullable } from './t-nullable';

export class Slide {
  template: Nullable<TemplateRef<any>> = null;
  id: Nullable<string> = null;
}
