import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private http = inject(HttpClient);
  private urlBaseEquipos = CONTEXT.API_EQUIPOS;
  private urlBaseDeportes = CONTEXT.API_DEPORTES;

  getDeportes(): Observable<any> {
    return this.http.get<any>(this.urlBaseDeportes).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
