import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuctionsService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }
  getAllPurchases(userId: string): Observable<any> {
    return this.http.put<any>(`${this.url}/v1/authentication/${userId}`, {});
  }
}
