import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  animations: [
    trigger('slideTranslate1', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in => out', [animate('0.5s ease-in')]),
      transition('out => in', [animate('0.5s ease-out')]),
    ]),
    trigger('slideTranslate2', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('in => out', [animate('0.5s ease-in')]),
      transition('out => in', [animate('0.5s ease-out')]),
    ]),

    trigger('slideAnimation', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0.1' })),
      transition('in => out', [animate('0.5s ease-in')]),
      transition('out => in', [animate('0.5s ease-out')]),
    ]),

    trigger('fromRightToLieft', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0.1' })),
      transition('in => out', [animate('0.5s ease-in')]),
      transition('out => in', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  @ViewChildren(AppTemplateDirective) templates: Nullable<QueryList<any>> =
    null;
  currentSlide$!: Observable<Nullable<Slide>>;

  currentSlideState = 'in';

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
    this.currentSlideState = 'out';
  }

  onAnimationDone(event: any) {
    // Проверка, что анимация действительно закончилась

    if (event.fromState === 'in' && event.toState === 'out') {
      // Выполнение действий после завершения анимации
      console.log(event);
      this.sliderService.next();
      this.currentSlideState = 'in';
    }
  }
}
