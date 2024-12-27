import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { UnauthGuard } from './unauth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'my-books', component: MyBooksComponent, canActivate: [AuthGuard] },
  { path: 'user/show', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
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
