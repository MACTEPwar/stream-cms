import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SliderService } from 'src/app/core/app-services/slider.service';
import { Slide } from 'src/app/models/slide';
import { Nullable } from 'src/app/models/t-nullable';
import { AppTemplateDirective } from 'src/app/shared/directives/template.directive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SliderService],
})
export class MainComponent implements OnInit {
  @ViewChildren(AppTemplateDirective) templates: Nullable<QueryList<any>> =
    null;
  currentSlide$!: Observable<Nullable<Slide>>;

  constructor(
    private sliderService: SliderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentSlide$ = this.sliderService.currentSlide$;
  }

  ngAfterViewInit(): void {
    (this.templates as QueryList<AppTemplateDirective>)
      // .filter((f) => f.getType() === 'slide')
      .forEach((item, ind) => {
        this.sliderService.addSlides([
          {
            id: `slide${ind + 1}`,
            template: item.template,
          },
        ]);
      });
    this.sliderService.loadSlide('slide1');
  }

  nextSlide(): void {
    this.sliderService.next();
  }
}
