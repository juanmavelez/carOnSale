import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormater',
})
export class TimeFormaterPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - hours * 3600) / 60);
    const seconds = value - hours * 3600 - minutes * 60;
    return `${hours}Hours : ${minutes}Minutes : ${seconds}Seconds`;
  }
}
