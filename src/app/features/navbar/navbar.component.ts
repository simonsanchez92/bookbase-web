import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { QueryObject } from '../../shared/interfaces/query-object.interface';
import { User } from '../../shared/interfaces/user.interface';
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
    ReactiveFormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  user$: Observable<User | null> = this.userService.user$;

  private fb = inject(FormBuilder);
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      term: [''],
    });
  }

  logout() {
    localStorage.removeItem('bookbase-token');
    this.authService['isLoggedInSubject'].next(false); //Updates logged-in state
    this.router.navigate(['/login']);
  }

  onSubmit(formGroup: FormGroup) {
    const searchTerm = formGroup.get('term')?.value;

    const queryObject: QueryObject = {
      Search: searchTerm,
      Sorts: [
        {
          propertyName: 'id',
          descending: false,
        },
      ],
      Filters: [],
    };

    const jsonString = JSON.stringify(queryObject);
    const base64Encoded = btoa(jsonString);

    searchTerm
      ? this.router.navigate(['/search'], {
          queryParams: { query: base64Encoded },
        })
      : this.router.navigate(['/search']);

    this.formGroup.reset();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
