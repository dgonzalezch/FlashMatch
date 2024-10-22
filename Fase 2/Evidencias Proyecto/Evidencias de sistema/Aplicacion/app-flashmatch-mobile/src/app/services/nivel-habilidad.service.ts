import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NivelHabilidadService {
  private http = inject(HttpClient);
  private urlBaseNivelHabilidad = CONTEXT.API_NIVEL_HABILIDAD;

  getAllNivelesHabilidad(): Observable<any> {
    return this.http.get<any>(this.urlBaseNivelHabilidad).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getNivelHabilidad(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseNivelHabilidad + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
