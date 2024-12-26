import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoginFormComponent } from '../../features/login-form/login-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, MatCardModule, MatButtonToggleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  isLoading = false;
  errorState = false;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  handleFormSubmit(payload: { email: string; password: string }) {
    this.isLoading = true;
    this.errorState = false;
    this.loadingService.startLoading();
    this.authService
      .login(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          localStorage.setItem('bookbase-token', res.token);
          this.authService['isLoggedInSubject'].next(true);
          this.userService.setUserState(res.token);
          this.router.navigate(['/my-books']);
        },
        error: (err) => {
          this.loadingService.stopLoading();

          console.log(err);
          this.errorState = true;
          this.isLoading = false;
        },
        complete: () => {
          this.loadingService.stopLoading();
          this.isLoading = false;
        },
      });
  }

  handleErrorState(error: boolean) {
    this.errorState = error;
  }
}
