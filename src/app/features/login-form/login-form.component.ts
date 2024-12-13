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
import { LoginRequest } from '../../shared/interfaces/login-request.interface';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);
  private fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loadingService.startLoading();
      const payload: LoginRequest = {
        email: form.get('email')?.value,
        password: form.get('password')?.value,
      };

      this.authService
        .login(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            localStorage.setItem('bookbase-token', res.token);
            this.router.navigate(['/register']);
          },
          error: (err) => {
            this.loadingService.stopLoading();
            console.log(err);
          },
          complete: () => {
            this.loadingService.stopLoading();
          },
        });
    }
  }
}
