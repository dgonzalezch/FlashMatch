import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonList, IonItemGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRow, IonCol, IonButton, IonSelect, IonSelectOption, IonDatetime, IonBadge, IonGrid, IonButtons, IonBackButton, IonIcon, IonFooter, AlertController, LoadingController, IonSearchbar, IonAvatar, IonChip } from '@ionic/angular/standalone';
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
  imports: [IonChip, IonAvatar, IonSearchbar, IonFooter, IonIcon, IonBackButton, IonButtons, IonGrid, IonBadge, IonDatetime, IonButton, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonItemGroup, IonList, IonItem, IonLabel, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export default class ReservaPage implements OnInit {
  private reservaCanchaService = inject(ReservaCanchaService);
  private alertService = inject(AlertService);
  private alertController = inject(AlertController);
  private loadingController = inject(LoadingController);

  listReservasCancha = signal<ReservaCancha[]>([]);
  currentFilter = signal<string>('todos');

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
  onFilterChange(filter: string) {
    this.currentFilter.set(filter);
  }

  filteredReservas() {
    const filter = this.currentFilter();
    if (filter === 'todos') {
      return this.listReservasCancha();
    }
    return this.listReservasCancha().filter(reserva => reserva.estado === filter);
  }

  async sendRespuestaReserva(id_reserva: string, status: 'aceptada' | 'rechazada') {
    const alert = await this.alertController.create({
      header: 'Confirmar reserva',
      message: status == 'aceptada' ? `¿Estás seguro de que deseas aceptar la reserva?` : `¿Estás seguro de que deseas rechazar la reserva?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Enviando respuesta de reserva...',
              duration: 3000
            });
            await loading.present();

            this.reservaCanchaService.approveOrRejectCancha(id_reserva, status).subscribe({
              next: async (resp: responseSuccess) => {
                this.getListReservas();
                await loading.dismiss();
                this.alertService.message(resp.message);
              },
              error: async (err: responseError) => {
                await loading.dismiss();
                this.alertService.error(err.message);
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  formatEstadoReserva(estado: string): string {
    switch (estado) {
      case 'pendiente_pago_reserva':
        return 'P. pago';
      case 'pendiente_confirmacion':
        return 'P. confirmación';
      case 'aceptada':
        return 'Aceptada';
      case 'rechazada':
        return 'Rechazada';
      default:
        return estado;
    }
  }
}
