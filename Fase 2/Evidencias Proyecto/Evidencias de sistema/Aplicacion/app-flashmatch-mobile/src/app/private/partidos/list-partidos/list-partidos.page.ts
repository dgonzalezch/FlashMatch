import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonSegmentButton, IonIcon, IonButtons, IonSegment, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonCardSubtitle, IonText, IonProgressBar, IonChip, IonSpinner, IonBadge } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.page.html',
  styleUrls: ['./list-partidos.page.scss'],
  standalone: true,
  imports: [IonBadge, IonSpinner, IonChip, IonProgressBar, IonText, IonCardSubtitle, IonCol, IonRow, IonGrid, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonModal, IonSegment, IonButtons, IonIcon, IonSegmentButton, IonFooter, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MapComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListPartidosPage implements OnInit {

  isModalOpen = false;

  partidosPendientesAceptacion = [
    {
      id: '1',
      nombre: 'Partido de Fútbol Infantil',
      fecha: '2024-10-15 10:00',
      ubicacion: 'Cancha Municipal',
      descripcion: 'Partido amistoso de fútbol para niños de 8 a 12 años.',
    },
    {
      id: '2',
      nombre: 'Torneo de Fútbol Amateur',
      fecha: '2024-10-20 15:00',
      ubicacion: 'Cancha de Césped Sintético',
      descripcion: 'Torneo abierto para equipos amateurs de la región.',
    },
    {
      id: '3',
      nombre: 'Partido de Liga Local',
      fecha: '2024-10-22 18:00',
      ubicacion: 'Estadio Municipal',
      descripcion: 'Partido de liga local entre equipos de la comunidad.',
    }
  ];

  partidosDisponibles = [
    { nombre: 'Partido Fútbol 11', fecha: '12/10/2024', hora: '18:00' },
    { nombre: 'Partido Fútbol 7', fecha: '13/10/2024', hora: '16:30' }
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
