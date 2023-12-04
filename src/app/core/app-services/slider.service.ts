import { ChangeDetectorRef, Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slide } from 'src/app/models/slide';
import { Nullable } from 'src/app/models/t-nullable';

@Injectable()
export class SliderService {
  slides$: BehaviorSubject<Slide[]> = new BehaviorSubject<Slide[]>([]);
  tiemer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  currentSlide$: BehaviorSubject<Nullable<Slide>> = new BehaviorSubject<
    Nullable<Slide>
  >(null);

  timeOut: number = 3;

  constructor(private cdr: ChangeDetectorRef) {}

  addSlides(slides: Slide[]): void {
    this.slides$.next([...this.slides$.getValue(), ...slides]);
  }

  loadSlide(id: string): void {
    const slides = this.slides$.getValue();
    const finder = slides.find((f) => f.id === id);
    this.currentSlide$.next(finder!);
    this.cdr.detectChanges();
  }

  next(): void {
    const slides = this.slides$.getValue();
    const currSlideIdx = slides.findIndex(
      (f) => f.id === this.currentSlide$.getValue()?.id
    );
    if (currSlideIdx === slides.length - 1) {
      this.loadSlide(slides[0].id!);
    } else {
      this.loadSlide(slides[currSlideIdx + 1].id!);
    }
  }

  prev(): void {}
}
