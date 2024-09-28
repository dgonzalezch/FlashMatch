import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CONTEXT, ENDPOINT } from '../shared/configs/api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private urlBaseAuth = CONTEXT.API_AUTH;

  registerUser(registerFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseAuth + ENDPOINT.AUTH_REGISTER, registerFormData).pipe(
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

  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.urlBaseAuth + ENDPOINT.AUTH_CHECK_STATUS, { headers }).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
