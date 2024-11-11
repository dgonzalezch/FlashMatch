import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  //{
  //  path: '',
    //component: MainLayoutComponent,
    //children: [
  {
     path: 'home', // child route path
     loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.component').then(c => c.QuizComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contacto/contacto.component').then(c => c.ContactoComponent)
      },
  {
    path: 'legal',
    loadComponent: () => import('./pages/legal/legal.component').then(c => c.LegalComponent)
      },    
      { path: '**', redirectTo: 'home', pathMatch: 'full' }  
  
];
