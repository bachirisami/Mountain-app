import { Routes } from '@angular/router';
import {LoginPage} from './login-page/login-page';
import {RegistrationPage} from './registration-page/registration-page';
import {Dashboard} from './dashboard/dashboard';
import {MountainDetailPage} from './mountain-detail-page/mountain-detail-page';

export const routes: Routes =
  [
    {
      path: 'login',
      component: LoginPage
    },
    {
      path: 'register',
      component: RegistrationPage
    },
    {
      path: '',
      component: Dashboard
    },
    {
      path: 'mountain/:id',
      component: MountainDetailPage
    }
  ];
