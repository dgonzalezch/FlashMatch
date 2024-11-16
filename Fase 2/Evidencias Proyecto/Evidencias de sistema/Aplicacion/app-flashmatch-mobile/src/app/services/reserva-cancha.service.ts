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

  getAllReservasCancha(): Observable<any> {
    return this.http.get<any>(this.urlBaseReserva + this.urlEndpointReservaCancha).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }

  approveOrRejectCancha(id_reserva_cancha: string, status: string): Observable<any> {
    return this.http.patch<any>(this.urlBaseReserva + this.urlEndpointReservaCancha + id_reserva_cancha + '/' + 'estado', {estado: status}).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
