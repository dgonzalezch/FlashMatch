import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private http = inject(HttpClient);
  private urlBaseCancha = CONTEXT.API_CANCHA;
  private urlEndpointDisponibles = ENDPOINT.CANCHAS_DISPONIBLES;

  getCanchas(): Observable<any> {
    return this.http.get<any>(this.urlBaseCancha).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getCanchasCercanasHorario(partido: {latitud: any, longitud: any, partido_id: string}): Observable<any> {
    return this.http.post<any>(this.urlBaseCancha + this.urlEndpointDisponibles, partido).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  createCancha(createCanchaFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseCancha, createCanchaFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
