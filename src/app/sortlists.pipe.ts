import { List } from './services/checklist-api.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortlists'
})
export class SortlistsPipe implements PipeTransform {

  transform(lists: List[]): unknown {
    return lists.sort((b, a) => (Date.parse(a.date_modified) - Date.parse(b.date_modified.valueOf())));
  }

}
