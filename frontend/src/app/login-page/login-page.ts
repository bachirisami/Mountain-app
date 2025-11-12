import {Component, inject, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import AuthService from '../auth-service';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage = signal<string>('');
  private router = inject(Router);
  private authService = inject(AuthService);

  async onLogin() {
    this.errorMessage.set('');

    if (!this.email || !this.password) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    try {
      await this.authService.login(this.email, this.password);

      const returnUrl = localStorage.getItem('returnUrl') || '/';
      localStorage.removeItem('returnUrl');
      await this.router.navigate([returnUrl]);
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.errorMessage.set('Invalid email or password');
      } else if (error.response?.status === 422) {
        this.errorMessage.set('Please check your input');
      } else {
        this.errorMessage.set('An error occurred. Please try again');
      }
    }
  }
}
