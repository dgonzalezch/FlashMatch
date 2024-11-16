import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';
import { Deporte } from '../interfaces/deporte.interface';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {
  private http = inject(HttpClient);
  private urlBaseDeporte = CONTEXT.API_DEPORTE

  getAllDeportes(): Observable<any> {
    return this.http.get<Deporte[]>(this.urlBaseDeporte).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
