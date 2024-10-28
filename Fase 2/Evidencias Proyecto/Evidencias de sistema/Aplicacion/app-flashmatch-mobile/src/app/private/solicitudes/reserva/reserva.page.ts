import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonList, IonItemGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRow, IonCol, IonButton, IonSelect, IonSelectOption, IonDatetime, IonBadge, IonGrid, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { ReservaCanchaService } from 'src/app/services/reserva-cancha.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { ReservaCancha } from 'src/app/interfaces/reserva-cancha.interface';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonIcon, IonBackButton, IonButtons, IonGrid, IonBadge, IonDatetime, IonButton, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonItemGroup, IonList, IonItem, IonLabel, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export default class ReservaPage implements OnInit {
  private reservaCanchaService = inject(ReservaCanchaService);
  private alertService = inject(AlertService);
  listReservasCancha = signal<ReservaCancha[]>([]);

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
    this.getListReservas();
  }

  getListReservas(): void {
    this.reservaCanchaService.getAllReservasCancha().subscribe({
      next: (resp: responseSuccess) => {
        this.listReservasCancha.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  sendRespuestaReserva(id_reserva: string, status: string) {
    this.reservaCanchaService.approveOrRejectCancha(id_reserva, status).subscribe({
      next: (resp: responseSuccess) => {
        this.alertService.message(resp.message);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  rechazarReserva(id: string) {
    // Lógica para rechazar la reserva
  }

}
