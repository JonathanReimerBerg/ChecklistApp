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
    if (numDays < 1) {
      let hours = Math.ceil(numDays * 24);

      if (hours) {
        return hours !== 1 ? String(hours) + ' Hours': String(hours) + ' Hour';
      }
    } else if (numDays >= 1 && numDays < 7) {
      let days = Math.ceil(numDays);
      return days !== 1 ? String(days) + ' Days': String(days) + ' Day';
    } else {
      let weeks = Math.floor(numDays / 7);
      return weeks !== 1 ? String(weeks) + ' Weeks': String(weeks) + ' Week';
    }
  }

}
