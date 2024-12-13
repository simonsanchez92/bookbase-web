import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest } from '../interfaces/signin-request.interface';
import { SignInResponse } from '../interfaces/signin-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);

  signIn(body: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(
      'https://localhost:7274/api/users/signin',
      body
    );
  }
}
