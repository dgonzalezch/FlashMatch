import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private http = inject(HttpClient);
  private urlBasePartido = CONTEXT.API_PARTIDO;
  private urlBaseUsuarioPartido = CONTEXT.API_USUARIO_PARTIDO;

  createPartido(partidoFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBasePartido, partidoFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getPartidos(): Observable<any> {
    return this.http.get<any>(this.urlBasePartido).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getPartidosUsuario(idUsuario: string): Observable<any> {
    return this.http.get<any>(this.urlBasePartido + 'usuario/' + idUsuario).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getPartido(id_partido: string): Observable<any> {
    return this.http.get<any>(this.urlBasePartido + id_partido).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  joinPartido(usuarioPartidoData: { userId: string, partidoId: string }) {
    return this.http.post<any>(this.urlBaseUsuarioPartido + 'join', usuarioPartidoData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getPartidosDisponiblesUsuario(terms: { usuario_id: string, deporte_id: string, fecha?: string }) {
    return this.http.post<any>(this.urlBasePartido + 'disponibles', terms).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  partidoRellenarJugadores(idPartido: any) {
    return this.http.patch<any>(this.urlBasePartido + idPartido + '/' + 'rellenar-jugadores', '').pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
