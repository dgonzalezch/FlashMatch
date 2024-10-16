import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposEmparejamientosService {
  private http = inject(HttpClient);
  private urlBaseTiposEmparejamientos = CONTEXT.API_TIPOS_EMPAREJAMIENTOS;

  getAllTiposEmparejamientos(): Observable<any> {
    return this.http.get<any>(this.urlBaseTiposEmparejamientos).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getTipoEmparejamiento(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseTiposEmparejamientos + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
