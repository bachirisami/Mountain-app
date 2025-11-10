import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import AuthService from '../auth-service';
import axios from 'axios';
import {environment} from '../../environments/environment.development';
import {FormsModule} from '@angular/forms';

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

  constructor(private router: Router, private authService: AuthService) {
  }

  async onLogin() {
    await axios.post(environment.apiUrl + 'login', {
      email: this.email,
      password: this.password
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
    })

    await this.router.navigate(['/']);
  }
}
