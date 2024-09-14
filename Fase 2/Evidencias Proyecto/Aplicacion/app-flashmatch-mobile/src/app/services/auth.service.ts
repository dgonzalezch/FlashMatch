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
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_REGISTER, registerFormData)
      .pipe(
        switchMap(async response => {
          if (response?.token) {
            await this.storageService.saveToken(response.token);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.message));
        }),
        timeout(environment.apiTime)
      );
  }

  loginUser(loginUserFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_LOGIN, loginUserFormData)
      .pipe(
        switchMap(async response => {
          if (response?.token) {
            await this.storageService.saveToken(response.token);
          }
          return response;
        }),
        catchError(async (error: HttpErrorResponse) => {
          await this.storageService.removeToken();
          return throwError(() => new Error(error.message));
        }),
        timeout(environment.apiTime)
      );
  }

  checkStatus(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.storageService.getToken()}`);
    return this.http.get<any>(this.urlBaseAuth + ENDPOINT.AUTH_CHECK_STATUS, { headers })
      .pipe(
        switchMap(async response => {
          if (response?.token) {
            await this.storageService.saveToken(response.token);
          }
          return response;
        }),
        catchError(async (error: HttpErrorResponse) => {
          await this.storageService.removeToken();
          return throwError(() => new Error(error.message));
        }),
        timeout(environment.apiTime)
      );
  }
}
