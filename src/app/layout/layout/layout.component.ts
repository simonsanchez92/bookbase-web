import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../features/footer/footer.component';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);

  isLoading = computed(() => this.loadingService.isLoading());
  isLoggedIn$ = this.authService.isLoggedIn$;
}
