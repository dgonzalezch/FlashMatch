import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeportePosicionUsuarioService {
  private http = inject(HttpClient);
  private urlBaseDeportePosicionUsuario = CONTEXT.API_USUARIO;

  createDeportePosicionUsuario(deportesPosicionesUsuariosForm: any): Observable<any> {
    return this.http.post<any>(this.urlBaseDeportePosicionUsuario + 'deporte-posicion', deportesPosicionesUsuariosForm).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
