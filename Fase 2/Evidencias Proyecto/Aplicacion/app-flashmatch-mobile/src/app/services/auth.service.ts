import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, switchMap, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CONTEXT, ENDPOINT } from '../shared/configs/api-config';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private urlBaseAuth = CONTEXT.API_AUTH;

  registerUser(registerFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_REGISTER, registerFormData).pipe(
      switchMap(response => {
        if (response?.token) {
          return this.storageService.saveToken(response.token).pipe(
            switchMap(() => of(response)) // Devuelve la respuesta después de guardar el token
          );
        }
        return of(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      }),
      timeout(environment.apiTime)
    );
  }

  loginUser(loginUserFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_LOGIN, loginUserFormData).pipe(
      switchMap(response => {
        if (response?.token) {
          return this.storageService.saveToken(response.token).pipe(
            switchMap(() => of(response)) // Devuelve la respuesta después de guardar el token
          );
        }
        return of(response);
      }),
      catchError(({ error }: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      timeout(environment.apiTime)
    );
  }

  refreshToken(): Observable<any> {
    return this.storageService.getToken().pipe(
      switchMap(token => {
        if (!token) {
          // Si no hay token, lanzar un error o manejar el caso apropiadamente
          return throwError(() => new Error('No token found'));
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.urlBaseAuth + ENDPOINT.AUTH_CHECK_STATUS, { headers }).pipe(
          switchMap(response => {
            if (response?.token) {
              // Guardar el nuevo token
              return this.storageService.saveToken(response.token).pipe(
                map(() => response) // Retornar la respuesta después de guardar el token
              );
            }
            return of(response); // Si no hay nuevo token en la respuesta
          }),
          catchError((error: HttpErrorResponse) => {
            // En caso de error, eliminar el token y propagar el error
            return this.storageService.removeToken().pipe(
              switchMap(() => throwError(() => new Error(error.message)))
            );
          }),
          timeout(environment.apiTime) // Configurar timeout para la petición
        );
      }),
      catchError((error) => {
        // En caso de error al obtener el token, manejar el error
        return throwError(() => new Error(error.message));
      })
    );
  }
}
