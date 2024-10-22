import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RangoEdadService {
  private http = inject(HttpClient);
  private urlBaseRangoEdad = CONTEXT.API_RANGO_EDAD

  getAllRangosEdad(): Observable<any> {
    return this.http.get<any>(this.urlBaseRangoEdad).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
