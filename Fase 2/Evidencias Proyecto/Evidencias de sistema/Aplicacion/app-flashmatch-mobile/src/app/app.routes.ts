import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.layout-page'),
    canActivate: [RedirectIfAuthenticatedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page')
      },
      {
        path: 'register',
        children: [
          {
            path: 'step-1',
            loadComponent: () => import('./auth/register/step-1/step-1.page')
          },
          {
            path: 'step-2',
            loadComponent: () => import('./auth/register/step-2/step-2.page')
          },
          {
            path: 'step-3',
            loadComponent: () => import('./auth/register/step-3/step-3.page')
          },
          {
            path: '**',
            redirectTo: 'step-1',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'recovery-password',
        loadComponent: () => import('./auth/recovery-password/recovery-password.page')
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'private',
    loadComponent: () => import('./private/private.layout-page'),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./private/home/home.page'),
      },
      {
        path: 'matches',
        children: [
          {
            path: 'list-matches',
            loadComponent: () => import('./private/partidos/list-partidos/list-partidos.page')
          },
          {
            path: 'create-match',
            children: [
              {
                path: 'step-1',
                loadComponent: () => import('./private/partidos/create-partido/step-1/step-1.page')
              },
              {
                path: 'step-2',
                loadComponent: () => import('./private/partidos/create-partido/step-2/step-2.page')
              },
              {
                path: 'step-3',
                loadComponent: () => import('./private/partidos/create-partido/step-3/step-3.page')
              },
            ]
          },
          {
            path: 'detail-match/:id',
            loadComponent: () => import('./private/partidos/detail-partido/detail-partido.page').then( m => m.DetailPartidoPage)
          },
          {
            path: '**',
            redirectTo: 'list-matches',
            pathMatch: 'full'
          }
        ]

      },
      {
        path: 'courts',
        children: [
          {
            path: 'list-courts',
            loadComponent: () => import('./private/canchas/list-canchas/list-canchas.page')
          },
          {
            path: '**',
            redirectTo: 'list-courts',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'teams',
        children: [
          {
            path: 'create-team',
            loadComponent: () => import('./private/equipos/create-equipo/create-equipo.page')
          },
          {
            path: 'update-team',
            loadComponent: () => import('./private/equipos/update-equipo/update-equipo.page')
          },
          {
            path: 'list-teams',
            loadComponent: () => import('./private/equipos/list-equipos/list-equipos.page')
          },
          {
            path: '**',
            redirectTo: 'list-teams',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'players',
        children: [
          {
            path: 'list-users',
            loadComponent: () => import('./private/usuarios/list-usuarios/list-usuarios.page')
          },
          {
            path: 'detail-user',
            loadComponent: () => import('./private/usuarios/detail-usuario/detail-usuario.page')
          },
          {
            path: '**',
            redirectTo: 'list-users',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('./private/perfil/perfil.layout-page'),
        children: [
          {
            path: 'user-info',
            loadComponent: () => import('./private/perfil/info-usuario/info-usuario.page')
          },
          {
            path: 'statistics',
            loadComponent: () => import('./private/perfil/estadisticas/estadisticas.page')
          },
          {
            path: 'historical',
            loadComponent: () => import('./private/perfil/historial/historial.page')
          },
          {
            path: '**',
            redirectTo: 'user-info',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'configurations',
        loadComponent: () => import('./private/configurations/configurations.page')
      },
      {
        path: 'notifications',
        loadComponent: () => import('./private/notifications/notifications.page')
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'private/home',
    pathMatch: 'full'
  },
];
