import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page')
      },
      {
        path: 'registry',
        loadComponent: () => import('./auth/registry/registry.page')
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'home',
    children: [
      {
        path: 'perfil',
        loadComponent: () => import('./auth/login/login.page')
      },
      {
        path: 'registry',
        loadComponent: () => import('./auth/registry/registry.page')
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
