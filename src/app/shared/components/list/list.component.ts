import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ListItem } from './list-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() items: Array<ListItem> = [];
  @Input() lineSpacing: number = 8;
  @Input() width: number | 'full' = 'full';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calcWidth();
  }
  
  widthInPx: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.calcWidth();
  }

  calcWidth(): void {
    if (this.width === 'full') {
      const parentWidth =
        this.el.nativeElement.parentNode.getBoundingClientRect().width;
      this.widthInPx = parentWidth;
    } else {
      this.widthInPx = this.width;
    }
  }
}
