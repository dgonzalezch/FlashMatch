import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule, provideStorage } from '@ionic/storage-angular';
import { importProvidersFrom } from '@angular/core';
import { Drivers } from '@ionic/storage';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LOCALE_ID } from '@angular/core'; // Importa LOCALE_ID
import localeES from '@angular/common/locales/es-CL'; // Importa la configuración regional

import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'storagedb',
      driverOrder: [Drivers.IndexedDB]
    })),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    { provide: LOCALE_ID, useValue: 'es-CL' } // Establece la configuración regional aquí
  ],
});
defineCustomElements(window);
