import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransmissionTypePipe } from './pipes/trnasmission-type/transmission-type.pipe';
import { TimeFormaterPipe } from './pipes/timeFormater/time-formater.pipe';
import { FuelTypePipe } from './pipes/fuelType/fuel-type.pipe';

@NgModule({
  declarations: [TransmissionTypePipe, TimeFormaterPipe, FuelTypePipe],
  exports: [TransmissionTypePipe, TimeFormaterPipe, FuelTypePipe],
  imports: [CommonModule],
})
export class SharedModule {}
