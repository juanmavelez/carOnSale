import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorPipe } from './interceptors/http-error.pipe';

@NgModule({
  declarations: [HttpErrorPipe],
  imports: [CommonModule],
})
export class CoreModule {}
