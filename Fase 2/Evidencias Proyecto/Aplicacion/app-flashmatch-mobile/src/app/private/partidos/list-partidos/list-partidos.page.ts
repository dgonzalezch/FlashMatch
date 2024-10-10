import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonSegmentButton, IonIcon, IonButtons, IonSegment, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonCardSubtitle } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.page.html',
  styleUrls: ['./list-partidos.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCol, IonRow, IonGrid, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonModal, IonSegment, IonButtons, IonIcon, IonSegmentButton, IonFooter, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MapComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListPartidosPage implements OnInit {

  isModalOpen = false;

  team1Players = [
    { name: 'Jugador 1' },
    { name: 'Jugador 2' },
    { name: 'Jugador 3' },
    { name: 'Jugador 4' },
    { name: 'Jugador 5' }
  ];

  // Lista de jugadores del Equipo 2
  team2Players = [
    { name: 'Jugador A' },
    { name: 'Jugador B' },
    { name: 'Jugador C' },
    { name: 'Jugador D' },
    { name: 'Jugador E' }
  ];

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  results = [
    {
      name: 'Partido Amistoso de Fútbol',
      location: 'Parque Central',
      date: '25/09/2024',
      skillLevel: 'Intermedio',
      type: 'Amistoso'
    },
    {
      name: 'Torneo Competitivo de Verano',
      location: 'Estadio Municipal',
      date: '01/10/2024',
      skillLevel: 'Avanzado',
      type: 'Competitivo'
    },
    {
      name: 'Entrenamiento de Pretemporada',
      location: 'Polideportivo Norte',
      date: '28/09/2024',
      skillLevel: 'Novato',
      type: 'Entrenamiento'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
