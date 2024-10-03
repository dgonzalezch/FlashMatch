import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonButton, IonInput, IonRange, IonSelect, IonSelectOption, IonItemDivider, IonCardTitle, IonCardContent, IonList, IonCard, IonCardHeader, IonModal, IonButtons, IonFooter, IonDatetimeButton, IonSegmentButton, IonIcon, IonSegment, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MapComponent } from 'src/app/shared/components/map/map.component';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
  standalone: true,
  imports: [IonText, IonSegment, IonIcon, IonSegmentButton, IonDatetimeButton, IonFooter, IonButtons, IonModal, IonCardHeader, IonCard, IonList, IonCardContent, IonCardTitle, IonItemDivider, IonRange, IonSelect, IonSelectOption, IonInput, IonButton, IonDatetime, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, MapComponent]
})
export default class PartidosPage implements OnInit {

  isModalOpen = false;

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
