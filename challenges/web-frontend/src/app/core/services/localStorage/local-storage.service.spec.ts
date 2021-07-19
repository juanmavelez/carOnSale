import { TestBed } from '@angular/core/testing';
import { windowWhen } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('hould be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  describe('Testing setSession()', () => {
    it('Should return a true', () => {
      const value = localStorageService.setSession('token', 'scopes', 'userId');
    });
    it('Should return false due missing token', () => {
      const value = localStorageService.setSession('', 'scopes', 'userId');
      expect(value).toBeFalsy();
    });
    it('Should return false due missing scopes', () => {
      const value = localStorageService.setSession('token', '', 'userId');
      expect(value).toBeFalsy();
    });
    it('Should return false due missing userId', () => {
      const value = localStorageService.setSession('token', 'scopes', '');
      expect(value).toBeFalsy();
    });
  });

  describe('Testing Logout', () => {
    it('Should return True', () => {
      localStorageService.logout();
    });
  });

  describe('Testing getToken()', () => {
    it('Should return a string', () => {
      window.localStorage.setItem('token', '1234');
      const value = localStorageService.getToken();
      expect(value).toEqual('1234');
    });
    it('Should return null', () => {
      window.localStorage.clear();
      const value = localStorageService.getToken();
      expect(value).toBeNull();
    });
  });
  describe('Testing getScopes()', () => {
    it('Should return a string', () => {
      window.localStorage.setItem('scopes', 'admin');
      const value = localStorageService.getScopes();
      expect(value).toEqual('admin');
    });
    it('Should return null', () => {
      window.localStorage.clear();
      const value = localStorageService.getScopes();
      expect(value).toBeNull();
    });
  });
});
