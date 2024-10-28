import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonItem, IonLabel, IonList, IonButton, IonAvatar, IonBackButton, IonButtons, IonSpinner, IonProgressBar, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-partido',
  templateUrl: './detail-partido.page.html',
  styleUrls: ['./detail-partido.page.scss'],
  standalone: true,
  imports: [IonIcon, IonProgressBar, IonSpinner, IonButtons, IonBackButton, IonAvatar, IonButton, IonList, IonLabel, IonItem, IonCardContent, IonBadge, IonCardTitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class DetailPartidoPage implements OnInit {

  partido = {
    "id_partido": "e99c15e5-8fda-459d-a91e-f1d845e40d6a",
    "fecha_partido": "2024-10-29T11:00:00.000Z",
    "descripcion": "Partido amistoso para divertirse y mejorar habilidades",
    "estado": "confirmado",
    "partido_privado": false,
    "jugadores_actuales": 5,
    "jugadores_requeridos": 22,
    "creador": {
      "id_usuario": "b9c922c8-30d9-4c87-a304-000c7d052da6",
      "nombre": "Daniel González"
    },
    "deporte": {
      "nombre_deporte": "Fútbol 11",
      "icono": "football-outline"
    },
    "nivelHabilidad": {
      "nombre_nivel_habilidad": "Principiante"
    },
    "rangoEdad": {
      "descripcion": "18 - 25 años"
    },
    "tipoPartido": {
      "nombre_tipo_partido": "Entretenimiento"
    },
    "reserva": {
      "fecha_reserva": "2024-10-29",
      "hora_reserva": "10:00",
      "cancha": {
        "ubicacion": "Eyzaguirre 61, San Bernardo, Chile",
        "material": {
          "nombre_material_cancha": "Pasto Natural"
        }
      }
    },
    "equipoA": {
      "integrantes": [
        {
          "id_usuario": "123",
          "nombre": "Juan Pérez",
          "posicion": "Delantero",
          "imagen_perfil": "https://ionicframework.com/docs/img/demos/avatar.svg"
        },
      ]
    },
    "equipoB": {
      "integrantes": [
        {
          "id_usuario": "123",
          "nombre": "Juan Pérez",
          "posicion": "Delantero",
          "imagen_perfil": "https://ionicframework.com/docs/img/demos/avatar.svg"
        },
      ]
    },
    "jugadoresConfirmados": [
      {
        "id_usuario": "123",
        "nombre": "Juan Pérez",
        "posicion": "Delantero",
        "imagen_perfil": "https://ionicframework.com/docs/img/demos/avatar.svg"
      },
      {
        "id_usuario": "456",
        "nombre": "Jesús López",
        "posicion": "Defensa",
        "imagen_perfil": "https://ionicframework.com/docs/img/demos/avatar.svg"
      }
    ],
    "invitadosPendientes": [
      {
        "id_usuario": "789",
        "nombre": "Fernando Martínez",
        "imagen_perfil": "https://ionicframework.com/docs/img/demos/avatar.svg"
      },
      {
        "id_usuario": "101",
        "nombre": "Pedro Torres",
        "imagen_perfil": "https://ionicframework.com/docs/img/demos/avatar.svg"
      }
    ]
  }


  constructor() { }

  ngOnInit() {
  }

  invitarJugadores() {
    console.log("Invitando jugadores...");
    // Lógica para invitar jugadores
  }
}
