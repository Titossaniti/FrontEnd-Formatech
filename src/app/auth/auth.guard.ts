import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Vérifier les rôles requis pour cette route
    const allowedRoles: string[] = route.data['roles'];
    const userRole = this.storageService.getUserRole();

    if (!allowedRoles || allowedRoles.includes(<string>userRole)) {
      return true;
    }

    // Redirection si l'utilisateur n'a pas le bon rôle
    this.router.navigate(['/home']);
    return false;
  }
}
