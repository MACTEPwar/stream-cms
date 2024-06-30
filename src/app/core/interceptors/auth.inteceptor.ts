import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../app-services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/login')) {
      // Если запрос на обновление токена авторизации по рефреш токену, то выполнить его
      return next.handle(request);
    }

    return next.handle(
      request.clone({
        setHeaders: this.generateHeader(),
      })
    );
  }

  /**
   * Генерирует хедеры для запроса
   */
  private generateHeader(): {
    [name: string]: string | string[];
  } {
    const headers: { [name: string]: string | string[] } = {
      // 'Accept-Language': this.translateService?.currentLang ?? 'uk',
    };

    if (this.authService.isAuthenticated()) {
      headers[
        'Authorization'
      ] = `Bearer ${this.authService.currentUserHash$.getValue()}`;
    }

    return headers;
  }
}
