import {Injectable} from '@angular/core';
import { environment } from '../environments/environment';
import axios from 'axios';
import {RegisterRequest} from './models/registerRequest.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  async logout(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(
        environment.apiUrl + 'logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}`,  'Content-Type': 'application/json'}
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
    }
  }

  async register(request: RegisterRequest) {
    try {
      return await axios.post(
        environment.apiUrl + 'register',
        request,
        {
          headers: {'Content-Type': 'application/json'},
        }
      );
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await axios.post(
        environment.apiUrl + 'login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default AuthService
