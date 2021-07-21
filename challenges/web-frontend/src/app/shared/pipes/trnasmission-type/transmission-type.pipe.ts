import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transmissionType',
})
export class TransmissionTypePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case -1:
        return 'Manual';
      case 0:
        return 'Automated manual';
      case 1:
        return 'Automatic';
      default:
        return String(value);
    }
  }
}
