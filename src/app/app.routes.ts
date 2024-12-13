import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UnauthGuard } from './unauth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: 'forgotten-password',
    component: ForgottenPasswordComponent,
    canActivate: [UnauthGuard],
  },
  { path: '**', redirectTo: '' },
];
