import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth-service';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      return true;
    } else {
      console.log('Redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
