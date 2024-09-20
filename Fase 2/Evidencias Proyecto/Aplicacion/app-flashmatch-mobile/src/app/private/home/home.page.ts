import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonIcon, IonTabButton, IonTab, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCol, IonGrid, IonRow, IonImg, IonFooter, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonImg, IonRow, IonGrid, IonCol, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonTab, IonTabButton, IonIcon, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export default class HomePage implements OnInit {

  router = inject(Router)

  sections = [
    { color: '#FF5733', image: 'assets/logo/logo-flashmatch.png', title: 'Partidos', route: '/buscar-partido' },
    { color: '#33C3FF', image: 'assets/logo/logo-flashmatch.png', title: 'Equipos', route: '/crear-equipo' },
    { color: '#5F33A6', image: 'assets/logo/logo-flashmatch.png', title: 'Estadísticas', route: '/ver-estadisticas' },
    { color: '#FF33A6', image: 'assets/logo/logo-flashmatch.png', title: 'Invitaciones', route: '/ver-invitaciones' }
  ];

  constructor() { }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
