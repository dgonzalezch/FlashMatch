import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';
import { Deporte } from '../interfaces/deporte.interface';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {
  private http = inject(HttpClient);
  private urlBaseDeportes = CONTEXT.API_DEPORTES;
  private urlBaseDeportesPosicionesUsuarios = CONTEXT.API_DEPORTES_POSICIONES_USUARIOS;

  getAllDeportes(): Observable<any> {
    return this.http.get<Deporte[]>(this.urlBaseDeportes).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  createDeportePosicionUsuario(deportesPosicionesUsuariosForm: any): Observable<any> {
    return this.http.post<any>(this.urlBaseDeportesPosicionesUsuarios, deportesPosicionesUsuariosForm).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
