import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

import { jwtDecode } from 'jwt-decode';
import { jwtPayload } from '../interfaces/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private tokenKey = 'bookbase-token';

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkLoggedIn()
  );

  get isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      'https://localhost:7274/api/auth',
      body
    );
  }

  checkLoggedIn(): boolean {
    return !!window.localStorage.getItem(this.tokenKey);
  }

  getDecodedToken(): jwtPayload | null {
    const token = localStorage.getItem(this.tokenKey);

    return token ? this.decodeToken(token) : null;
  }

  decodeToken(token: string): jwtPayload | null {
    if (token) {
      try {
        const res = jwtDecode<jwtPayload>(token);
        return res;
      } catch (error) {
        console.error('Error deciding token ', error);
        return null;
      }
    }
    return null;
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();

    if (!decoded) {
      return true;
    }

    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decoded.exp < currentTime; //Check if session has expired
  }

  logout() {
    //### Logging from Auth Service
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    console.log('Session expired, User has been logged out.');
  }

  checkTokenOnStartup() {
    if (this.isTokenExpired()) {
      this.logout();
      this.router.navigate(['/']);
    }
  }
  // getUserId(): number | null {
  //   const decodedToken = this.getDecodedToken();
  //   return decodedToken ? decodedToken.id : null;
  // }

  // getUserEmail(): string | null {
  //   const decodedToken = this.getDecodedToken();
  //   return decodedToken ? decodedToken.email : null;
  // }
}
