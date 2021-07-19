import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { IAuction } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class AuctionsService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }
  getAuctionBuyer(userId: string): Observable<IAuction> {
    return this.http.get<IAuction>(`${this.url}/v2/auction/buyer/`, {});
  }
}
