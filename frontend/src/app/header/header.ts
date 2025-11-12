import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import AuthService from '../auth-service';
import {MountainService} from '../mountain-service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  mobileMenuOpen = signal(false);
  private router = inject(Router);
  protected authService = inject(AuthService);

  async logout() {
    await this.authService.logout();
    if (this.router.url === '/create-mountain') {
      this.router.navigate(['/']);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  navigateToLogin() {
    localStorage.setItem('returnUrl', this.router.url);
    this.router.navigate(['/login']);
  }
}
