import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuthenticatedGuard implements CanActivate {

  private storageService = inject(StorageService);
  private router = inject(Router);

  canActivate() {
    // return this.storageService.getToken().pipe(
    //   map(token => {
    //     if (token) {
    //       // Si existe el token, redirige al usuario a la página de inicio
    //       this.router.navigate(['/home']);
    //       return false; // Bloquea el acceso a las rutas de autenticación
    //     } else {
    //       // Si no existe el token, permite el acceso a las rutas de autenticación
    //       return true;
    //     }
    //   }),
    //   catchError(() => {
    //     // En caso de error al obtener el token, permite el acceso a las rutas de autenticación
    //     return of(true);
    //   })
    // );

    return true;
  }
}
