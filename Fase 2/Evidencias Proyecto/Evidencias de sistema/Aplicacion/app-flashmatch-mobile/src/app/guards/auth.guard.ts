import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private storageService = inject(StorageService);
  private router = inject(Router);

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return from(this.storageService.get('token')).pipe(
      map(token => {
        if (token) {
          // Si existe el token, se permite el acceso
          return true;
        } else {
          // Si no existe el token, redirige al login
          this.router.navigate(['/auth']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error checking auth status', error);
        this.router.navigate(['/auth']);
        return of(false); // No permitir el acceso
      })
    );
  }
}
