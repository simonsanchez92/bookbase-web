import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
//   import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
//   import { SessionExpiredModalComponent } from '../components/session-expired-modal/session-expired-modal.component';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   //   private authService = inject(AuthService);
//   private router = inject(Router);
//   private dialog = inject(MatDialog);

//   constructor(private authService: AuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     //Attach token to the request headers
//     const token = localStorage.getItem('bookbase-token');
//     if (token) {
//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }

//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           //Handle unauthorized error (Token expired or invalid)
//           this.handleSessionExpired();
//         }
//         return throwError(() => error);
//       })
//     );
//   }

//   private handleSessionExpired() {
//     this.authService.logout(); // Clear the token and state
//     this.openSessionExpiredDialog();
//     this.router.navigate(['/login']);
//   }

//   private openSessionExpiredDialog() {
//     // this.dialog.open(SessionExpiredModalComponent, {
//     //     width: '400px',
//     //     disableClose: true
//     // })
//   }
// }

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('bookbase-token');

  const clonedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.log('### Logging from interceptor');

        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
