import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getItem('authToken');
    const excludedUrls = ['/users/signup/', '/users/login/'];

    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req); // Pass through without adding the token
    }

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
