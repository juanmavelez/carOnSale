import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setSession(token: string, scopes: string, userId: string): boolean {
    localStorage.setItem('userId', userId);
    localStorage.setIem('token', token);
    localStorage.setItem('scopes', scopes);
    return true;
  }

  logout(): boolean {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('scopes');
    return true;
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }
  getScopes(): string {
    return localStorage.getItem('scopes');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
}
