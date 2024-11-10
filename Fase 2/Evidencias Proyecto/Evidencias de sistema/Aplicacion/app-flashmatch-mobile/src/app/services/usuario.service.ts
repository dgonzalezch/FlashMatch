import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private urlBaseUsuario = CONTEXT.API_USUARIO;
  private urlBaseEvaluacion = CONTEXT.API_EVALUACION

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.urlBaseUsuario).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getUsuario(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseUsuario + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  patchUsuario(id_usuario: any, body: any): Observable<any> {
    return this.http.patch<any>(this.urlBaseUsuario + id_usuario, body).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  uploadProfilePicture(id_usuario: string, file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'profile.jpg');

    return this.http.post<any>(this.urlBaseUsuario + ENDPOINT.UPLOAD_PROFILE_PICTURE + id_usuario, formData).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  markNotificationsAsRead(userId: string) {
    return this.http.put<any>(this.urlBaseUsuario + `${userId}/notificaciones/marcar-leidas`, {}).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  enviarEvaluacion(formEvaluacionUsuario: any) {
    debugger
    return this.http.post<any>(this.urlBaseEvaluacion, formEvaluacionUsuario).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
