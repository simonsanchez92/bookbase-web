import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  user$: Observable<User | null> = this.userService.user$;

  logout() {
    console.log('Logging out...');
    localStorage.removeItem('bookbase-token');
    this.authService['isLoggedInSubject'].next(false); //Updates logged-in state

    this.router.navigate(['/login']);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
