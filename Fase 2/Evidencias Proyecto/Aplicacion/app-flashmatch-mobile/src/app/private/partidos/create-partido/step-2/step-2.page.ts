import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonGrid, IonRow, IonCol, IonText, IonCardContent, IonIcon, IonButton, IonFooter, IonLabel, IonItem, IonList, IonToggle, IonThumbnail, IonDatetimeButton, IonModal, IonDatetime, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

// Definición de la interfaz Cancha
interface Cancha {
  id_cancha: string;
  nombre: string;
  precio_por_hora: number;
  ubicacion: string;
  descripcion: string;
  tipoCancha: string;
  imagen: string;
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonSegmentButton, IonSegment, IonCardSubtitle, IonCardTitle, IonCardHeader, IonAccordionGroup, IonAccordion, IonDatetime, IonModal, IonDatetimeButton, IonList, IonItem, IonLabel, IonFooter, IonButton, IonIcon, IonCardContent, IonText, IonCol, IonRow, IonGrid, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonToggle, IonThumbnail]
})
export default class Step2Page implements OnInit {

  selectedSegment = signal<string>('list');

  // Lista de canchas
  canchas: Cancha[] = [
    {
      id_cancha: '123e4567-e89b-12d3-a456-426614174000',
      nombre: 'Cancha Central',
      precio_por_hora: 20000,
      ubicacion: 'Calle Fútbol, Santiago',
      descripcion: 'Cancha amplia y bien mantenida, ideal para partidos de liga.',
      tipoCancha: 'Fútbol 11',
      imagen: 'https://example.com/cancha-central.jpg',
      latitud: -33.4489,
      longitud: -70.6693
    },
    {
      id_cancha: '456e7890-e12b-34d5-a678-426614174001',
      nombre: 'Cancha Rápida',
      precio_por_hora: 15000,
      ubicacion: 'Avenida Rápida, Santiago',
      descripcion: 'Cancha pequeña para fútbol 5, perfecta para jugar en grupos reducidos.',
      tipoCancha: 'Fútbol 5',
      imagen: 'https://example.com/cancha-rapida.jpg',
      latitud: -33.4568,
      longitud: -70.6482
    },
  ];

  useCurrentLocationValue: boolean = false; // Controla el uso de la ubicación actual
  selectedLocation: string | null = null;

  ngOnInit() {
  }

  // Método para manejar el uso de la ubicación actual
  useCurrentLocation(event: any) {
    this.useCurrentLocationValue = event.detail.checked;
    // Aquí puedes agregar la lógica para usar la ubicación actual
    if (this.useCurrentLocationValue) {
      console.log('Usando ubicación actual');
    } else {
      console.log('No se usará la ubicación actual');
    }
  }

  // Método para abrir un selector de ubicación
  openLocationPicker() {
    console.log('Abriendo selector de ubicación');
    // Aquí puedes agregar la lógica para abrir un selector de ubicación
  }

  onLocationToggle(event: any) {
    if (event.detail.checked) {
      // Usar la ubicación actual
      this.selectedLocation = "Ubicación actual"; // Aquí puedes añadir lógica para obtener la ubicación actual
    } else {
      this.selectedLocation = null; // Reiniciar la ubicación seleccionada
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment.set(event.detail.value);
  }
}
