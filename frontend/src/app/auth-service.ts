import { Injectable } from '@angular/core';
import {environment} from '../environments/environment.development';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    axios.post(environment.apiUrl + 'logout', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
    })
    localStorage.removeItem('token');
  }


}

export default AuthService
