import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RangosEdadService {
  private http = inject(HttpClient);
  private urlBaseRangosEdad = CONTEXT.API_RANGOS_EDAD

  getRangosEdad(): Observable<any> {
    return this.http.get<any>(this.urlBaseRangosEdad).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
