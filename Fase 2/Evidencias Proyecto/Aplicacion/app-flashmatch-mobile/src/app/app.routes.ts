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
        loadComponent: () => import('./private/matches/matches.page')
      },
      {
        path: 'courts',
        loadComponent: () => import('./private/courts/courts.page')
      },
      {
        path: 'teams',
        children: [
          {
            path: 'create-team',
            loadComponent: () => import('./private/teams/create-team/create-team.page')
          },
          {
            path: 'update-team',
            loadComponent: () => import('./private/teams/update-team/update-team.page')
          },
          {
            path: 'list-teams',
            loadComponent: () => import('./private/teams/list-teams/list-teams.page')
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
        loadComponent: () => import('./private/players/players.page')
      },
      {
        path: 'profile',
        loadComponent: () => import('./private/profile/profile.page')
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
