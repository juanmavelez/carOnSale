import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from '@environments/environment';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let setSessionSpy: jasmine.Spy;

  beforeEach(async () => {
    const localStorageStub = jasmine.createSpyObj('LocalStorage', [
      'setSession',
    ]);
    setSessionSpy = localStorageStub.setSession.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocalStorageService, useValue: localStorageStub }],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('Testing  login', () => {
    it('Should return True if the response works', () => {
      const resStub = {
        token: 'string',
        authenticared: true,
        userId: 'string',
        internalUserId: 1,
        internalUserUUID: 'string',
        type: 1,
        privileges: '{PUBLIC_USER}~{SALESMAN_USER}',
      };

      let dataError, dataResponse;

      authService.login('userId', 'password').subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.url}/v1/authentication/userId`
      );

      req.flush(resStub);
      expect(dataResponse).toBeTruthy();
      expect(req.request.method).toEqual('PUT');
      expect(dataError).toBeUndefined();
      expect(setSessionSpy).toBeTruthy();
      expect(setSessionSpy).toHaveBeenCalledWith(
        resStub.token,
        resStub.privileges,
        resStub.userId
      );
    });
    it('Should return false if the response has no userId', () => {
      const resStub = {
        token: 'string',
        authenticared: true,
        userId: '',
        internalUserId: 1,
        internalUserUUID: 'string',
        type: 1,
        privileges: '{PUBLIC_USER}~{SALESMAN_USER}',
      };
      let dataError, dataResponse;

      authService.login('userId', 'password').subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.url}/v1/authentication/userId`
      );
      req.flush(resStub);
      expect(dataResponse).toBeFalsy();
      expect(req.request.method).toEqual('PUT');
      expect(dataError).toBeUndefined();
      expect(setSessionSpy).not.toHaveBeenCalledWith();
    });
    it('Should return false if the response has no token', () => {
      const resStub = {
        token: '',
        authenticared: true,
        userId: 'string',
        internalUserId: 1,
        internalUserUUID: 'string',
        type: 1,
        privileges: '{PUBLIC_USER}~{SALESMAN_USER}',
      };
      let dataError, dataResponse;

      authService.login('userId', 'password').subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.url}/v1/authentication/userId`
      );
      req.flush(resStub);
      expect(dataResponse).toBeFalsy();
      expect(req.request.method).toEqual('PUT');
      expect(dataError).toBeUndefined();
      expect(setSessionSpy).not.toHaveBeenCalledWith();
    });
    it('Should return false if the user has no privileges', () => {
      const resStub = {
        token: 'string',
        authenticared: true,
        userId: 'string',
        internalUserId: 1,
        internalUserUUID: 'string',
        type: 1,
        privileges: '',
      };
      let dataError, dataResponse;

      authService.login('userId', 'password').subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.url}/v1/authentication/userId`
      );
      req.flush(resStub);
      expect(dataResponse).toBeFalsy();
      expect(req.request.method).toEqual('PUT');
      expect(dataError).toBeUndefined();
      expect(setSessionSpy).not.toHaveBeenCalledWith();
    });
  });
});
