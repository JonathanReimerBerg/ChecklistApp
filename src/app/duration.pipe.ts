import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(daysUntilDue: string): string {
    if (daysUntilDue.includes("Week")) {
      return "success";
    } else if (daysUntilDue.includes("Day")) {
      return "warning";
    } else if (daysUntilDue.includes("Hour")) {
      return "danger";
    } else {
      return "medium";
    }
  }

}
