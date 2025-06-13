import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) {}

  canActivate(route:ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['role'];
    const user = this.authService.getUserData();
    const loggedIn = this.authService.isLoggedIn();
    console.log('Guard canActivate, logged in?', loggedIn);
    if (!loggedIn) {
      this.route.navigate(['/login']);
      return true;
    }
    if (expectedRoles && (!user || !expectedRoles.includes(user.rol))) {
      console.log('User role not authorized:', user ? user.rol : 'No user data');
      this.route.navigate(['/']);
      return false;
    }
    return true;
  }
}