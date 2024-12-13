import { Routes } from '@angular/router';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: ForgottenPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: '**', redirectTo: 'login' },
];
