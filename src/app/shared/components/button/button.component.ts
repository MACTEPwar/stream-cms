import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWidth();
  }

  public uniqueId: string;

  parentWidth: number = 0;

  offsetLayer1: number = 0;
  staticWidthLayer1: number = 52.1832;

  offsetLayer2: number = 0;
  staticWidthLayer2: number = 30 + 30 + 6;

  offsetLayer3_mask: number = 0;
  staticWidthLayer3_mask: number = 30 + 30;

  offsetLayer4: number = 0;
  staticWidthLayer4: number = 30 + 30 + 10;

  constructor(private el: ElementRef) {
    this.uniqueId = this.generateUniqueId();
  }

  ngOnInit(): void {
    this.updateWidth();
  }

  updateWidth(): void {
    console.log(
      'Parent',
      this.el.nativeElement.parentNode,
      this.el.nativeElement.parentNode.getBoundingClientRect().width
    );
    this.parentWidth =
      this.el.nativeElement.parentNode.getBoundingClientRect().width;

    this.offsetLayer1 = this.parentWidth - this.staticWidthLayer1;
    this.offsetLayer2 = this.parentWidth - this.staticWidthLayer2;
    this.offsetLayer3_mask = this.parentWidth - this.staticWidthLayer3_mask;
    this.offsetLayer4 = this.parentWidth - this.staticWidthLayer4;
  }

  private generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }
}
