import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonList, IonItemGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRow, IonCol, IonButton, IonSelect, IonSelectOption, IonDatetime, IonBadge, IonGrid, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonIcon, IonBackButton, IonButtons, IonGrid, IonBadge, IonDatetime, IonButton, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonItemGroup, IonList, IonItem, IonLabel, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export default class ReservaPage implements OnInit {

  constructor() { }


  reservas: any[] = [
    {
      id: '1',
      canchaNombre: 'Cancha Central',
      fecha: new Date('2023-11-10T14:00:00'),
      estado: 'pendiente',
      solicitanteNombre: 'Juan Pérez',
      comentarios: 'Solicito la cancha para un partido amistoso',
    },
    {
      id: '2',
      canchaNombre: 'Cancha Norte',
      fecha: new Date('2023-11-12T18:00:00'),
      estado: 'aceptada',
      solicitanteNombre: 'María Gómez',
      comentarios: 'Reservada para un torneo de la liga local',
    },
    {
      id: '3',
      canchaNombre: 'Cancha Sur',
      fecha: new Date('2023-11-15T10:00:00'),
      estado: 'rechazada',
      solicitanteNombre: 'Carlos López',
      comentarios: 'Solicito una reserva para entrenamiento',
    },
  ];


  ngOnInit() {
  }

  aceptarReserva(id: string) {
    // Lógica para aceptar la reserva
  }

  rechazarReserva(id: string) {
    // Lógica para rechazar la reserva
  }

}
