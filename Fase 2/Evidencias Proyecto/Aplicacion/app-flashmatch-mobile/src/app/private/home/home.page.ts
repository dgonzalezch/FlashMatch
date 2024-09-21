import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonIcon, IonTabButton, IonTab, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCol, IonGrid, IonRow, IonImg, IonFooter, IonButton, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonLabel, IonList, IonItem, IonButton, IonFooter, IonImg, IonRow, IonGrid, IonCol, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonTab, IonTabButton, IonIcon, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export default class HomePage implements OnInit {

  router = inject(Router)

  sections = [
    { color: '#FF5733', image: 'assets/logo/logo-flashmatch.png', title: 'Partidos', route: 'private/matches' },
    { color: '#33C3FF', image: 'assets/logo/logo-flashmatch.png', title: 'Equipos', route: '/crear-equipo' },
    { color: '#5F33A6', image: 'assets/logo/logo-flashmatch.png', title: 'Estadísticas', route: '/ver-estadisticas' },
    { color: '#FF33A6', image: 'assets/logo/logo-flashmatch.png', title: 'Invitaciones', route: '/ver-invitaciones' },
    { color: '#FF90B6', image: 'assets/logo/logo-flashmatch.png', title: 'Historial', route: '/ver-historial' }
  ];

  userPerformance = {
    averageScore: 8.5,
    matchesPlayed: 20,
    matchesWon: 12
  };

  upcomingMatches = [
    { title: 'Partido en la cancha A', date: new Date(), location: 'Cancha A' },
    { title: 'Partido en la cancha B', date: new Date(), location: 'Cancha B' }
  ];

  pastMatches = [
    { title: 'Partido en la cancha C', date: new Date('2023-08-10'), result: 'Ganado' },
    { title: 'Partido en la cancha D', date: new Date('2023-08-05'), result: 'Perdido' }
  ];

  invitations = [
    { match: { title: 'Partido en la cancha E' }, inviterName: 'Carlos' },
    { match: { title: 'Partido en la cancha F' }, inviterName: 'Juan' }
  ];


  constructor() { }

  ngOnInit() {
  }

}
