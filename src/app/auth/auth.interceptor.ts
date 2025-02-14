import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    // Exclusion de l'URL de connexion car elle ne nécessite pas de token.
    const excludedUrls = ['/api/auth/login'];
    // Vérifier si l'URL de la requête est dans la liste des URL exclues
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
    // Passer la requête sans modification
    if (isExcluded) {
      return next.handle(req);
    }

    // Cloner la requête et ajouter le header Authorization si le token est présent
    const authReq = authToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403
        ) {
          // Rediriger vers la page de connexion en cas d'erreur 401
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
