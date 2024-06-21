import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ListItem } from '../list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item!: ListItem;
  @Input() flag = false;
  @Input() width!: number;

  l1ForLeftArrowStatic = 27 - 5;
  l1ForLeftArrowOffset = 0;
  l1ForRightArrowStatic = 27 - 5;
  l1ForRightArrowOffset = 0;

  public uniqueId: string;

  constructor(private el: ElementRef) {
    this.uniqueId = this.generateUniqueId();
  }

  ngOnInit(): void {
    this.recalcWidth();

    console.log(this.item);

    // this.width = 680
  }

  recalcWidth(): void {
    this.l1ForLeftArrowOffset =
      this.item.leftLabel?.width! - this.l1ForLeftArrowStatic;
    this.l1ForRightArrowOffset =
      this.item.rightLabel?.width! - this.l1ForRightArrowStatic;
  }

  private generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }
}
