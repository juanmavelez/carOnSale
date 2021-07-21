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

  it('Should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  describe('Testing setSession()', () => {
    it('Should return a true', () => {
      const value = localStorageService.setSession('token', 'scopes', 'userId');
      expect(value).toBeTruthy();
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token');
      expect(localStorage.setItem).toHaveBeenCalledWith('scopes', 'scopes');
      expect(localStorage.setItem).toHaveBeenCalledWith('userId', 'userId');
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
    it('Should clean the localStorage', () => {
      localStorage.setItem('token', 'token');
      localStorage.setItem('userId', 'userId');
      localStorageService.logout();
      expect(localStorage.getItem('userId')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('Testing getUserId()', () => {
    it('Should return a string', () => {
      window.localStorage.setItem('userId', 'user');
      const value = localStorageService.getUserId();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(value).toEqual('user');
    });
    it('Should return null', () => {
      window.localStorage.clear();
      const value = localStorageService.getToken();
      expect(value).toBeNull();
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
