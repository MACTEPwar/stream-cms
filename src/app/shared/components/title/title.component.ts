import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() width = 500;
  staticWidth = 4.5 + 14 + 4.5;
  offsetWidth = 189;

  constructor() {}

  ngOnInit(): void {
    this.offsetWidth = this.width - this.staticWidth;
  }
}
