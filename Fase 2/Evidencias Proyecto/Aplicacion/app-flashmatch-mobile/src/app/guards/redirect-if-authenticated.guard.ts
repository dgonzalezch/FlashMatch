// import { inject, Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { StorageService } from '../services/storage.service';
// import { AuthService } from '../services/auth.service';
// import { Observable, of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class RedirectIfAuthenticatedGuard implements CanActivate {

//   private storageService = inject(StorageService);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   canActivate(): Observable<boolean> {
//     return this.storageService.getToken().pipe(
//       switchMap(token => {
//         if (!token) {
//           // Si no hay token, permite el acceso a las rutas de autenticación
//           return of(true);
//         }

//         // Si hay token, verifica su validez
//         return this.authService.checkStatus().pipe(
//           map(response => {
//             if (response?.token) {
//               // Si el token es válido, redirige al usuario a la página de inicio
//               this.router.navigate(['/home']);
//               return false; // Bloquea el acceso a la ruta actual
//             } else {
//               // Si el token no es válido, permite el acceso a las rutas de autenticación
//               return true;
//             }
//           }),
//           catchError(() => {
//             // En caso de error en la verificación del token, permite el acceso a las rutas de autenticación
//             return of(true);
//           })
//         );
//       }),
//       catchError(() => {
//         // En caso de error en la obtención del token, permite el acceso a las rutas de autenticación
//         return of(true);
//       })
//     );
//   }
// }
