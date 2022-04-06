import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysUntilDue'
})
export class DaysUntilDuePipe implements PipeTransform {

  transform(date: string): string {
    let day1 = new Date(date).valueOf();
    let day2 = new Date(Date.now()).valueOf();

    let difference = Math.abs(day2 - day1);
    let numDays = difference / (1000 * 3600 * 24)
    let days = Math.ceil(numDays)

    return days !== 1 ? String(days) + ' Days': String(days) + ' Day';
  }

}
