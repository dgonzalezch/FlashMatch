import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonAvatar, IonCol, IonRow, IonFooter, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonGrid } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.page.html',
  styleUrls: ['./list-teams.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonRow, IonCol, IonAvatar, IonFabButton, IonFab, IonLabel, IonItem, IonList, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export default class ListTeamsPage implements OnInit {

  equipos = [
    {
      id_equipo: '1',
      nombre_equipo: 'Equipo A',
      logo_equipo: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      deporte: { nombre_deporte: 'Fútbol 7' },
      integrantes: [ /* Lista de integrantes */ ],
      creador: { nombre_usuario: 'Juan Pérez' },
      creado_en: new Date('2023-09-25T10:00:00') // Fecha de creación
    },
    {
      id_equipo: '2',
      nombre_equipo: 'Equipo B',
      logo_equipo: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      deporte: { nombre_deporte: 'Fútbol Sala' },
      integrantes: [ /* Lista de integrantes */ ],
      creador: { nombre_usuario: 'María Gómez' },
      creado_en: new Date('2023-09-26T15:30:00') // Fecha de creación
    }
  ];

  constructor() { }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    // Aquí deberías cargar los equipos desde un servicio o API
  }

  createTeam() {
    // Redirigir a la página de creación de equipos
    console.log('Crear equipo');
  }

  viewTeamDetails(id_equipo: string) {
    // Redirigir a la página de detalles del equipo
    console.log(`Ver detalles del equipo con ID: ${id_equipo}`);
  }
}
