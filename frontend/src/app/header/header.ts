import {Component, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import AuthService from '../auth-service';

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
  constructor(protected authService: AuthService, private router: Router) {
  }

  async logout() {
    await this.authService.logout();
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
