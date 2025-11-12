import {Component, inject, signal} from '@angular/core';
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
  errorMessage = signal('');
  fieldErrors = signal<Record<string, string[]>>({});
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {}

  async onRegister() {
    this.errorMessage.set('');
    this.fieldErrors.set({});

    if (!this.name() || !this.email() || !this.password() || !this.passwordConfirmation()) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    const passwordErrors: string[] = [];

    if (this.password().length < 6) {
      passwordErrors.push('Password must be at least 6 characters long');
    }

    const hasLetter = /[a-zA-Z]/.test(this.password());
    const hasNumber = /\d/.test(this.password());

    if (!hasLetter || !hasNumber) {
      passwordErrors.push('Password must contain both letters and numbers');
    }

    if (passwordErrors.length > 0) {
      this.fieldErrors.set({ password: passwordErrors });
      return;
    }

    if (this.password() !== this.passwordConfirmation()) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    try {
      const response = await this.authService.register({
        name: this.name(),
        email: this.email(),
        password: this.password(),
        password_confirmation: this.passwordConfirmation(),
      });

      localStorage.setItem('token', response.data.token);
      await this.router.navigate(['/']);
    } catch (error: any) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        this.fieldErrors.set(error.response.data.errors);
        this.errorMessage.set(error.response.data.message || 'Please check your input');
      } else {
        this.errorMessage.set(error.response?.data?.message || 'Registration failed');
      }
    }
  }
}
