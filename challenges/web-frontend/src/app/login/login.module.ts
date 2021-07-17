import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '@material/material.module';
import { LoginRouteModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LoginRouteModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
