import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from './list-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() items: Array<ListItem> = [];
  @Input() lineSpacing: number = 8;

  constructor() {}

  ngOnInit(): void {}
}
