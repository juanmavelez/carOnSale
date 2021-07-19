import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '@core/services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy: jasmine.Spy;
  let navigateByUrlSpy: jasmine.Spy;

  beforeEach(async () => {
    const authServiceStub = jasmine.createSpyObj('AuthService', ['login']);
    loginSpy = authServiceStub.login.and.returnValue(of(true));

    const routerStub = jasmine.createSpyObj('Router', ['navigateByUrl']);
    navigateByUrlSpy = routerStub.navigateByUrl;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: Router,
          useValue: routerStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization of LoginComponent', () => {
    it('Should create the forms', () => {
      expect(Object.keys(component.form.controls)).toEqual([
        'email',
        'password',
      ]);
    });
  });

  describe('Login method is executed', () => {
    it('Valid user', () => {
      component.form.get('email').setValue('email');
      component.form.get('password').setValue('password');
      component.signIn();

      expect(navigateByUrlSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalledWith('email', 'password');
      expect(component.hasError).toBeFalsy();
    });

    it('Missing parameter email the form', () => {
      component.form.get('password').setValue('password');
      component.signIn();

      expect(navigateByUrlSpy).not.toHaveBeenCalled();
      expect(loginSpy).not.toHaveBeenCalled();
      expect(component.hasError).toBeFalsy();
    });

    it('Missing parameter password the form', () => {
      component.form.get('email').setValue('email');
      component.signIn();

      expect(navigateByUrlSpy).not.toHaveBeenCalled();
      expect(loginSpy).not.toHaveBeenCalled();
      expect(component.hasError).toBeFalsy();
    });

    it('Invalid user', () => {
      loginSpy.and.returnValue(of(false));
      component.form.get('email').setValue('email');
      component.form.get('password').setValue('password');
      component.signIn();

      expect(navigateByUrlSpy).not.toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalledWith('email', 'password');
      expect(component.hasError).toBeTruthy();
    });
  });
});
