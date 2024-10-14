import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private http = inject(HttpClient);
  private urlBaseEquipos = CONTEXT.API_EQUIPOS;

  createEquipo(teamFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseEquipos, teamFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getEquipos(): Observable<any> {
    return this.http.get<any>(this.urlBaseEquipos).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
