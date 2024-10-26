import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaCanchaService {
  private http = inject(HttpClient);
  private urlBaseReserva = CONTEXT.API_RESERVA;
  private urlEndpointReservaCancha = ENDPOINT.RESERVA_CANCHA;

  createReservaCancha(reservaCanchaFormData: any): Observable<any> {
    return this.http.post<any>(this.urlBaseReserva + this.urlEndpointReservaCancha, reservaCanchaFormData).pipe(
      map(response => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  getReservasCancha(): Observable<any> {
    return this.http.get<any>(this.urlBaseReserva).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
