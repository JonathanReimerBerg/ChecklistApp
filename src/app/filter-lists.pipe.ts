import { List } from './services/checklist-api.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLists'
})
export class FilterListsPipe implements PipeTransform {

  transform(lists: List[], filterType: string): unknown {
    if (filterType == "completed") {
      return lists.filter(list => list.completed === "true");
    } else {
      return lists.filter(list => list.completed !== "true");
    }
  }

}
