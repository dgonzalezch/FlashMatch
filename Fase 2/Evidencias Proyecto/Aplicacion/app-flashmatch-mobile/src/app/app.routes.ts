import { Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
// import { RedirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [RedirectIfAuthenticatedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page')
      },
      {
        path: 'registry',
        children: [
          {
            path: 'step-1',
            loadComponent: () => import('./auth/registry/step-1/step-1.page')
          },
          {
            path: 'step-2',
            loadComponent: () => import('./auth/registry/step-2/step-2.page')
          },
          {
            path: 'step-3',
            loadComponent: () => import('./auth/registry/step-3/step-3.page')
          },
          {
            path: '**',
            redirectTo: 'step-1',
            pathMatch: 'full'
          }
        ]
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
    loadComponent: () => import('./home/home.page'),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
