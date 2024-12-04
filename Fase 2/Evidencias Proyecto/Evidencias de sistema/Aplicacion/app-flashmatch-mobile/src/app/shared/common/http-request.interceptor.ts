// src/app/interceptors/http-request.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// El interceptor en formato de función
export function httpRequestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // Define la URL base o el proxy
  const apiUrl = environment.apiUrl; // Aquí se usa la URL desde el archivo de configuración

  // Si la solicitud es a tu API, agrega el prefijo (esto es opcional si solo necesitas agregar el proxy)
  req = req.clone({
    url: apiUrl + req.url // Añade el prefijo "/api" o la ruta deseada
  });

  // Llamada al siguiente interceptor o manejador
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    })
  );
}
