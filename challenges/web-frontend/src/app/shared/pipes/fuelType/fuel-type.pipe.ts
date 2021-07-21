import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuelType',
})
export class FuelTypePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case -1:
        return 'Diesel';
      case 0:
        return 'Bio Diesel';
      case 1:
        return 'Gasoline';
      case 2:
        return 'Gasoleo A+';
      case 3:
        return 'Gasoleo B';
      case 4:
        return 'Gasoleo A';
      case 5:
        return 'Gas';
      default:
        return 'Uknown';
    }
  }
}
