import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEmparejamientoService {
  private http = inject(HttpClient);
  private urlBaseTipoEmparejamiento = CONTEXT.API_TIPO_EMPAREJAMIENTO;

  getAllTiposEmparejamientos(): Observable<any> {
    return this.http.get<any>(this.urlBaseTipoEmparejamiento).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getTipoEmparejamiento(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseTipoEmparejamiento + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
