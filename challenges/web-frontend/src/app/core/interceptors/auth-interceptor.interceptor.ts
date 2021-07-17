import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getToken();
    if (token) {
      const clon = request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token),
      });
      return next.handle(clon);
    }
    return next.handle(request);
  }
}
