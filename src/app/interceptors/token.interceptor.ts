import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getItem('authToken');
    //console.log('Intercepting request:', req.url, 'Token:', token);
    const excludedUrls = ['/users/signup/', '/users/login/'];

    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req); // Pass through without adding the token
    }

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`)
      });
      //console.log('Request with token:', cloned); 
      return next.handle(cloned);
    }
    console.warn('No token found for request:', req.url);
    return next.handle(req);
  }
}
