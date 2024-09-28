import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private storageService = inject(StorageService);
  private router = inject(Router);

  canActivate() {
    // return this.storageService.getToken().pipe(
    //   map(token => {
    //     if (token) {
    //       // Token existe, permite el acceso
    //       return true;
    //     } else {
    //       // Token no existe, redirige al login
    //       this.router.navigate(['/auth/login']);
    //       return false;
    //     }
    //   }),
    //   catchError(() => {
    //     // En caso de error, redirige al login
    //     this.router.navigate(['/auth/login']);
    //     return of(false);
    //   })
    // );
    return true;
  }
}
