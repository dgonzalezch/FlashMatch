import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuthenticatedGuard implements CanActivate {
  private storageService = inject(StorageService);
  private router = inject(Router);

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return from(this.storageService.get('token')).pipe(
      map(token => {
        if (token) {
          this.router.navigate(['/private']);
          return false;
        } else {
          return true;
        }
      }),
      catchError((error) => {
        console.error('Error al verificar el estado de autenticación:', error);
        return of(true);
      })
    );
  }
}
