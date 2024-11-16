import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaDetalladaUsuarioService {
  private http = inject(HttpClient);
  private urlBaseEstadisticaDetalladaUsuario = CONTEXT.API_ESTADISTICA_DETALLADA_USUARIO;

  createDeportePosicionUsuario(estadisticasDetalladasUsuarios: any): Observable<any> {
    return this.http.post<any>(this.urlBaseEstadisticaDetalladaUsuario, estadisticasDetalladasUsuarios).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
