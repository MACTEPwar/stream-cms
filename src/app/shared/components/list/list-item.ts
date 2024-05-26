import { Nullable } from 'src/app/models/t-nullable';

export class ListItem {
  startLabel: Nullable<ListItemContent> = null;
  endLabel: Nullable<ListItemContent> = null;
  content: Nullable<ListItemContent> = null;
}

export class ListItemContent {
  content: string = '';
  width: Nullable<number> = null;
  color: string = 'white';
}
