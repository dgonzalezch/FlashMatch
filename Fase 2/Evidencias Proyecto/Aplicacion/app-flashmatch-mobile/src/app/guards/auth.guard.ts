// import { inject, Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { StorageService } from '../services/storage.service';
// import { Observable, of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   private authService = inject(AuthService);
//   private storageService = inject(StorageService);
//   private router = inject(Router);

//   canActivate(): Observable<boolean> {
//     // Obtiene el token del almacenamiento
//     return this.storageService.getToken().pipe(
//       switchMap(token => {
//         if (!token) {
//           // Si no hay token, redirige al login
//           this.router.navigate(['/auth/login']);
//           return of(false);
//         }
//         // Verifica el estado del token en el servidor
//         return this.authService.checkStatus().pipe(
//           map(response => {
//             if (response?.token) {
//               return true;
//             } else {
//               this.router.navigate(['/auth/login']);
//               return false;
//             }
//           }),
//           catchError(() => {
//             this.router.navigate(['/auth/login']);
//             return of(false);
//           })
//         );
//       }),
//       catchError(() => {
//         this.router.navigate(['/auth/login']);
//         return of(false);
//       })
//     );
//   }
// }
