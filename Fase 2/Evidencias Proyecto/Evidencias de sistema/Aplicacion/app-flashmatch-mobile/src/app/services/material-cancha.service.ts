import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { CONTEXT, ENDPOINT } from 'src/app/shared/configs/api-config';
import { environment } from 'src/environments/environment';
import { Deporte } from '../interfaces/deporte.interface';
import { MaterialCancha } from '../interfaces/material-cancha.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialCanchaService {
  private http = inject(HttpClient);
  private urlBaseMaterialCancha = CONTEXT.API_MATERIAL_CANCHA

  getAllMaterialesCancha(): Observable<any> {
    return this.http.get<MaterialCancha[]>(this.urlBaseMaterialCancha).pipe(
      map((response) => response),
      catchError(({ error }: HttpErrorResponse) => throwError(() => error)),
      timeout(environment.apiTime)
    );
  }
}
