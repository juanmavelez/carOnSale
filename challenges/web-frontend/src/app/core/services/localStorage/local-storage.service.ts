import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setSession(token: string, scopes: string, userId: string): boolean {
    if (token && scopes && userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('scopes', scopes);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
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
