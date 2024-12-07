// src/app/interceptors/http-request.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';

// Interceptor para manejar el loader
export function httpRequestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingController = inject(LoadingController);
  const hostUrl = environment.hostUrl;

  // Mostrar loader al iniciar la solicitud
  let loader: HTMLIonLoadingElement | null = null;
  loadingController.create({
    message: 'Cargando...',
    spinner: 'crescent',
    cssClass: 'custom-loader', // Clase personalizada
    backdropDismiss: false,
  }).then(loading => {
    loader = loading;
    loader.present();
  });

  // Clona la solicitud para añadir la URL base
  req = req.clone({
    url: hostUrl + req.url
  });

  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
    finalize(() => {
      // Ocultar el loader cuando la solicitud finaliza
      if (loader) {
        loader.dismiss();
      }
    })
  );
}
