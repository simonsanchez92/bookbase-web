import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  // private _isLoggedIn = signal<boolean>(false);
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
}
