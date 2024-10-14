import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasDetalladasUsuariosService {
  private http = inject(HttpClient);
  private urlBaseEstadisticasDetalladasUsuarios = CONTEXT.API_ESTADISTICAS_DETALLADAS_USUARIOS;

  createDeportePosicionUsuario(estadisticasDetalladasUsuarios: any): Observable<any> {
    return this.http.post<any>(this.urlBaseEstadisticasDetalladasUsuarios, estadisticasDetalladasUsuarios).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
