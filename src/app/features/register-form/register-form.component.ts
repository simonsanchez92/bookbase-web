import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignInRequest } from '../../shared/interfaces/signin-request.interface';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private loadingService = inject(LoadingService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loadingService.startLoading();

      const payload: SignInRequest = {
        username: form.get('username')?.value,
        email: form.get('email')?.value,
        password: form.get('password')?.value,
      };

      this.userService
        .signIn(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.loadingService.stopLoading();
            console.log(res);

            this.authService
              .login({
                email: payload.email,
                password: payload.password,
              })
              .subscribe({
                next: (res) => {
                  localStorage.setItem('bookbase-token', res.token);
                  this.authService['isLoggedInSubject'].next(true);
                  this.userService.setUserState(res.token);
                  this.router.navigate(['/']);
                },
              });
          },
          error: (err) => {
            console.log(err);
            this.loadingService.stopLoading();
          },
          complete: () => {},
        });
    }
  }
}
