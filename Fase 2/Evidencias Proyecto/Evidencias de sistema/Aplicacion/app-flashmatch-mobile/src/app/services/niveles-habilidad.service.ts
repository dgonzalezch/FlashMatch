import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NivelesHabilidadService {
  private http = inject(HttpClient);
  private urlBaseNivelesHabilidad = CONTEXT.API_TIPOS_PARTIDOS;

  getNivelesHabilidad(): Observable<any> {
    return this.http.get<any>(this.urlBaseNivelesHabilidad).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getNivelHabilidad(term: any): Observable<any> {
    return this.http.get<any>(this.urlBaseNivelesHabilidad + term).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
