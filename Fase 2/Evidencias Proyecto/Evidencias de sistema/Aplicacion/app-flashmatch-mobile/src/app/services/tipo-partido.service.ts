import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPartidoService {
  private http = inject(HttpClient);
  private urlBaseTipoPartido = CONTEXT.API_TIPO_PARTIDO;

  getAllTiposPartidos(): Observable<any> {
    return this.http.get<any>(this.urlBaseTipoPartido).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getTipoPartido(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseTipoPartido + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
