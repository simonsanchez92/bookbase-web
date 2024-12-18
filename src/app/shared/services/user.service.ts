import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInRequest } from '../interfaces/signin-request.interface';
import { SignInResponse } from '../interfaces/signin-response.interface';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService = inject(AuthService);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  signIn(body: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(
      'https://localhost:7274/api/users/signin',
      body
    );
  }

  private fetchUserData(id: string): Observable<User> {
    return this.httpClient.get<User>(`https://localhost:7274/api/users/${id}`);
  }

  private updateUserState(decodedToken: any): void {
    if (decodedToken?.sub) {
      const id = decodedToken.sub;
      const email = decodedToken.email;

      this.fetchUserData(id).subscribe({
        next: (user) => {
          const loggedUser: User = {
            id: user.id,
            username: user.username,
            email: email,
          };
          this.userSubject.next(loggedUser);
        },
        error: (err) => console.log('Error updating user state:', err),
      });
    }
  }

  initializeUserState(): void {
    const decodedToken = this.authService.getDecodedToken();
    this.updateUserState(decodedToken);
  }

  // Update state when user logs in
  setUserState(token: string): void {
    const decodedToken = this.authService.decodeToken(token);
    this.updateUserState(decodedToken);
  }

  clearUserState(): void {
    this.userSubject.next(null);
    console.log('User state cleared');
  }

  // Get current value (optional utility method)
  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
