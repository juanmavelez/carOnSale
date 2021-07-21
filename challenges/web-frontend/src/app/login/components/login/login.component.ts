import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hasError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.hasError = false;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  signIn(): void {
    const value = this.form.value;
    console.log(value);
    if (value.email && value.password) {
      this.authService.login(value.email, value.password).subscribe(
        () => this.router.navigateByUrl('overview'),
        () => {
          this.hasError = true;
          alert('User or password incorrect, plis try again!');
        }
      );
    } else {
      this.hasError = true;
      window.alert('The user or password didnt work, try again!');
    }
  }
}
