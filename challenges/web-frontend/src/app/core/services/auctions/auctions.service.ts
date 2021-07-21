import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, retry, share, timer } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { IResponseAuctions, IAuction } from '@core/models';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuctionsService {
  url: string;
  token: string;
  userId: string;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.url = environment.url;
    this.token = this.localStorageService.getToken();
    this.userId = this.localStorageService.getUserId();
  }

  getAuctionBuyer(): Observable<IAuction[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        userId: this.userId,
        authToken: this.token,
      }),
    };

    const httpCall: Observable<IAuction[]> = this.http
      .get<IResponseAuctions>(`${this.url}/v2/auction/buyer/`, httpOptions)
      .pipe(
        map((res) => {
          return res.items;
        }),
        retry(3),
        share()
      );
    return timer(1, 3000).pipe(switchMap(() => httpCall));
  }
}
