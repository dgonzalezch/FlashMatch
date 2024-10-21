import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonItem, IonLabel, IonList, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-partido',
  templateUrl: './detail-partido.page.html',
  styleUrls: ['./detail-partido.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonLabel, IonItem, IonCardContent, IonBadge, IonCardTitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class DetailPartidoPage implements OnInit {

  partido = {
    estado: 'Pendiente', // El estado del partido (Pendiente, Iniciado, Finalizado, etc.)
    maxJugadores: 11, // Máximo de jugadores por equipo
    equipoA: {
      nombre: 'Equipo A',
      integrantes: [
        { nombre: 'Juan Pérez' },
        { nombre: 'Carlos Gutiérrez' },
        { nombre: 'Luis Rodríguez' },
        // Agrega más jugadores si es necesario
      ]
    },
    equipoB: {
      nombre: 'Equipo B',
      integrantes: [
        { nombre: 'Miguel Torres' },
        { nombre: 'Andrés Silva' },
        // Agrega más jugadores si es necesario
      ]
    }
  };

  constructor() { }

  ngOnInit() {
  }

  invitarJugadores() {
    console.log("Invitando jugadores...");
    // Lógica para invitar jugadores
  }
}
