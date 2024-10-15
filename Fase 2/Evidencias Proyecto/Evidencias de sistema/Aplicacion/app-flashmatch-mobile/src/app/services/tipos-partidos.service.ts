import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposPartidosService {
  private http = inject(HttpClient);
  private urlBaseTiposPartidos = CONTEXT.API_TIPOS_PARTIDOS;

  getTiposPartidos(): Observable<any> {
    return this.http.get<any>(this.urlBaseTiposPartidos).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getTipoPartido(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseTiposPartidos + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
