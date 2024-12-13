import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.checkLoggedIn()) {
      //Redirect logged users to homepage
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
