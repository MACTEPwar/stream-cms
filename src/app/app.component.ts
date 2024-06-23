import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stream-cms';
  visibleNavs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.setVh();
    // alert(window.innerHeight)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setVh();
  }

  setVh(): void {
    // Вычисляем высоту видимой области экрана
    const vh = window.innerHeight;
    // Устанавливаем значение CSS-переменной --vh
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  changeVisibleNav(state: boolean): void {
    this.visibleNavs$.next(state);
  }
}
