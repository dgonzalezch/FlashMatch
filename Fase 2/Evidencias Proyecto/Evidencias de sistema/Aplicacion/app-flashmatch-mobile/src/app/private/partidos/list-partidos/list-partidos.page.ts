import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonSegmentButton, IonIcon, IonButtons, IonSegment, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonCardSubtitle, IonText, IonProgressBar, IonChip, IonSpinner, IonBadge, IonSearchbar, IonFab, IonImg, IonAvatar, LoadingController, AlertController, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderMapComponent } from 'src/app/shared/components/header-map/header-map.component';
import { LocationService } from '../../../shared/common/location.service';
import { PartidoService } from 'src/app/services/partido.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { Partido } from 'src/app/interfaces/partido.interface';
import { StorageService } from 'src/app/services/storage.service';
import { UserInfoComponent } from 'src/app/shared/components/user-info/user-info.component';

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.page.html',
  styleUrls: ['./list-partidos.page.scss'],
  standalone: true,
  imports: [IonAccordion, IonModal, IonAccordionGroup, IonAvatar, IonImg, IonFab, IonSearchbar, IonBadge, IonSpinner, IonChip, IonProgressBar, IonText, IonCardSubtitle, IonCol, IonRow, IonGrid, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonModal, IonSegment, IonButtons, IonIcon, IonSegmentButton, IonFooter, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderMapComponent, RouterLink, UserInfoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListPartidosPage {
  private locationService = inject(LocationService);
  private partidoService = inject(PartidoService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);

  userId = signal<string>('');
  ubication = signal<string>('');
  listPartidos = signal<Partido[]>([]);
  detalleJugador = signal<any>(null);
  isModalOpen = signal<boolean>(false);

  ionViewWillEnter() {
    this.ubication.set(this.locationService.getLocation().ubicacion);
    this.loadUserId();
    this.loadPartidos();
  }

  async loadPartidos() {
    this.partidoService.getPartidosUsuario(await this.storageService.get('user')).subscribe({
      next: (resp: responseSuccess) => {
        this.listPartidos.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  async loadUserId() {
    const user = await this.storageService.get('user');
    if (user) {
      this.userId.set(user);
    }
  }

  async presentAlertConfirmJoinPartido(partidoId: string) {
    const alert = await this.alertController.create({
      header: 'Unirse a partido',
      message: `¿Estás seguro de que deseas unirte al partido?. Una vez que aceptes, serás redireccionado al pago.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Si, unirme',
          handler: () => {
            this.joinPartido(partidoId);
          }
        }
      ]
    });

    await alert.present();
  }

  rellenarJugadores(idPartido: string) {
    this.partidoService.partidoRellenarJugadores(idPartido).subscribe({
      next: (resp: responseSuccess) => {
        this.alertService.message('Partido listo.');
        this.loadPartidos()
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  async joinPartido(partidoId: string) {
    // Validar si hay al menos un horario seleccionado
    const loading = await this.loadingController.create({
      message: 'Uniéndose al partido...',
      duration: 3000
    });

    let user = await this.storageService.get('user');

    try {
      await loading.present();

      this.partidoService.joinPartido({ partidoId: partidoId, userId: user }).subscribe({
        next: async (resp: responseSuccess) => {
          await loading.dismiss();
          if (resp.data && resp.data.paymentUrl) {
            // Redirigir a la URL de pago proporcionada en la respuesta
            window.location.href = resp.data.paymentUrl;
          }
          // this.alertService.message(resp.message);
        },
        error: async (err: responseError) => {
          await loading.dismiss();
          this.alertService.error(err.message);
        }
      })
    } catch (error) {
      await loading.dismiss();
      this.alertService.error('Ocurrió un error inesperado al enviar la solicitud.');
    }
  }

  getColor(estado: string): string {
    switch (estado) {
      case 'listo':
        return 'success';
      case 'finalizado':
        return 'tertiary';
      case 'confirmado':
        return 'success';
      case 'pendiente_reserva':
        return 'warning';
      case 'cancelado':
        return 'danger';
      default:
        return 'primary'; // Color por defecto, si necesitas alguno para otros estados
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'listo':
        return 'Listo';
      case 'finalizado':
        return 'Finalizado';
      case 'pendiente_reserva':
        return 'Pendiente Cancha';
      case 'cancelado':
        return 'Cancelado';
      case 'confirmado':
        return 'Confirmado';
      case 'en_curso':
        return 'En Curso'
      default:
        return estado; // Retorna el estado tal cual si no encuentra una coincidencia
    }
  }


  openModal(creador: any) {
    this.detalleJugador.set(creador);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.detalleJugador.set(null); // Limpiar el detalle del jugador al cerrar
  }
}
