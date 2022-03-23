import { ListItem } from './services/checklist-api.service';
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
    } else {
      if (sortType === 'alphabetical') {
        listItems.sort((a, b) => a.item_name.localeCompare(b.item_name)).reverse();
      }
    }
    return listItems;
  }

}
