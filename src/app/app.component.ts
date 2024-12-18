import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'bookbase-web';
  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    console.log('Initializing user state..');

    this.authService.checkTokenOnStartup();
    this.userService.initializeUserState();
  }
}
