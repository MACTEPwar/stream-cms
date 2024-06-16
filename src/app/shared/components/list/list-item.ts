import { Nullable } from 'src/app/models/t-nullable';

export class ListItem {
  rightLabel: Nullable<ListItemContent> = null;
  leftLabel: Nullable<ListItemContent> = null;
  content: Nullable<ListItemContent> = null;
  diraction: 'left' | 'right' | 'two-way' | 'none' = 'left';
}

export class ListItemContent {
  content: string = '';
  width: Nullable<number> = null;
  color: string = 'white';
}
