import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import AuthService from '../auth-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.css',
})
export class RegistrationPage {
  name = signal('');
  email = signal('');
  password = signal('');
  passwordConfirmation = signal('');
  message = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    this.message.set('');

    if (this.password() !== this.passwordConfirmation()) {
      this.message.set('Passwords do not match');
      return;
    }

    try {

      const response = await this.authService.register({
        name: this.name(),
        email: this.email(),
        password: this.password(),
        password_confirmation: this.passwordConfirmation(),
      });

      // Save token and redirect
      localStorage.setItem('token', response.data.token);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error(error);
      this.message.set(error.response?.data?.message || 'Registration failed');
    }
  }
}
