import { Routes } from '@angular/router';
import {LoginPage} from './login-page/login-page';
import {RegistrationPage} from './registration-page/registration-page';
import {Dashboard} from './dashboard/dashboard';
import {MountainDetailPage} from './mountain-detail-page/mountain-detail-page';
import {CreateMountainPage} from './create-mountain-page/create-mountain-page';
import {AuthGuard} from './auth-guard';

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
    },
    {
      path: 'create-mountain',
      component: CreateMountainPage,
      canActivate: [AuthGuard]
    }
  ];
