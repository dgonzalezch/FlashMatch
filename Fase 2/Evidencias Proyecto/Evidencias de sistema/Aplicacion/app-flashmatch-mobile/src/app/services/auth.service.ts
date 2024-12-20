import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
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

  registerUser(registerFormData: any, userType: string): Observable<any> {
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_REGISTER + userType, registerFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  loginUser(loginUserFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_LOGIN, loginUserFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  changePassword(changePasswordFormData: any): Observable<any> {
    return this.http.patch<any>(this.urlBaseAuth + ENDPOINT.AUTH_CHANGE_PASSWORD, changePasswordFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.urlBaseAuth + ENDPOINT.AUTH_CHECK_STATUS, { headers }).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  async getUserData () {
    return {
      user: await this.storageService.get('user'),
      token: await this.storageService.get('token'),
      nombre: await this.storageService.get('nombre'),
      apellido: await this.storageService.get('apellido'),
      correo: await this.storageService.get('correo'),
      roles: await this.storageService.get('roles'),
      ubicacion: await this.storageService.get('ubicacion'),
      latitud: await this.storageService.get('latitud'),
      longitud: await this.storageService.get('longitud'),
      imagen_perfil: await this.storageService.get('imagen_perfil')
    }
  }
}
