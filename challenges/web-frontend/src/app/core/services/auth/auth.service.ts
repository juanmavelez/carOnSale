import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, retry, map } from 'rxjs/operators';

import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { IResponseAuth } from 'src/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.url = environment.url;
  }

  login(userMailId: string, password: string): Observable<boolean> {
    return this.http
      .put<IResponseAuth>(`${this.url}/v1/authentication/${userMailId}`, {
        password,
        meta: 'string',
      })
      .pipe(
        map((res) => {
          if (res.token && res.privileges && res.userId) {
            this.localStorageService.setSession(
              res.token,
              res.privileges,
              res.userId
            );
            return true;
          }
          return false;
        }),
        shareReplay(),
        retry(3)
      );
  }
}
