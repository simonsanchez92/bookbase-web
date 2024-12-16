import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // this.userService.fetchUserData().subscribe({
    //   next: (user) => console.log(user),
    //   error: (error) => console.log(error),
    // });
    // this.authService.getDecodedToken();
  }
}
