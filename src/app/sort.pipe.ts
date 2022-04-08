import { ChecklistApiService, ListItem, List } from './services/checklist-api.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(listItems: ListItem[], sortType: string, desc: boolean): unknown {
    if (desc) {
      if (sortType === 'alphabetical') {
        listItems.sort((a, b) => a.item_name.localeCompare(b.item_name));
      }
      if (sortType === 'completed') {
        listItems.sort(value => {return value.checked ? -1 : 1 });
      }
      if (sortType == 'doByDate') {
        listItems.sort((a, b) => (a.due_by_date != null ? a.due_by_date.valueOf() : Infinity) - (b.due_by_date != null ? b.due_by_date.valueOf() : Infinity))
      }
      if (sortType == 'dateCreated') {
        listItems.sort((a, b) => (a.item_id - b.item_id));
      }
    } else {
      if (sortType === 'alphabetical') {
        listItems.sort((a, b) => a.item_name.localeCompare(b.item_name)).reverse();
      }
      if (sortType === 'completed') {
        listItems.sort(value => {return value.checked ? 1 : -1 });
      }
      if (sortType == 'doByDate') {
        listItems.sort((a, b) => (b.due_by_date != null ? b.due_by_date.valueOf() : -Infinity) - (a.due_by_date != null ? a.due_by_date.valueOf() : -Infinity))
      }
      if (sortType == 'dateCreated') {
        listItems.sort((a, b) => (b.item_id - a.item_id));
      }
    }
    return listItems;
  }

}
