import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol, IonCardContent, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonSpinner, IonDatetime, IonAvatar, IonChip, IonDatetimeButton, IonModal, IonSegmentButton, IonFooter, IonBadge, IonAccordionGroup, IonAccordion, IonText, IonProgressBar, LoadingController } from '@ionic/angular/standalone';
import { MatchmakingService } from 'src/app/services/matchmaking.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { PartidoService } from 'src/app/services/partido.service';
import { UserInfoComponent } from 'src/app/shared/components/user-info/user-info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.page.html',
  styleUrls: ['./matchmaking.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonText, IonAccordion, IonAccordionGroup, IonBadge, IonFooter, IonSegmentButton, IonModal, IonDatetimeButton, IonChip, IonAvatar, IonDatetime, IonSpinner, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonCardContent, IonCol, IonRow, IonGrid, IonIcon, IonLabel, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonDatetime, RouterLink, UserInfoComponent, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MatchmakingPage {
  private matchmakingService = inject(MatchmakingService);
  private storageService = inject(StorageService);
  private usuarioService = inject(UsuarioService);
  private partidoService = inject(PartidoService);
  private alertService = inject(AlertService);
  private datePipe = inject(DatePipe);
  private loadingController = inject(LoadingController);

  partidosEncontrados = signal<any>(null);
  buscandoPartido = signal<boolean>(false);
  infoUsuario = signal<any>({});
  fechaBusqueda = signal<any>('');
  detalleJugador = signal<any>(null);
  isModalOpen = signal<boolean>(false);
  inMatchmaking = signal<boolean>(false);

  ionViewWillEnter() {
    this.getInfoUsuario();
  }

  iniciarMatchmaking() {
    const userId = 'user123';
    const preferencias = { nivelHabilidad: 'intermedio', deporte: 'futbol' };
    this.matchmakingService.conectarUsuario(userId, preferencias);
    this.inMatchmaking.set(true)
    this.matchmakingService.onNuevoPartido().subscribe((partido) => {
      this.getPartidosDisponiblesUsuario();
    });
  }

  async getInfoUsuario() {
    this.usuarioService.getUsuario(await this.storageService.get('user')).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  getPartidosDisponiblesUsuario() {
    const dataBusqueda = {
      usuario_id : this.infoUsuario().id_usuario,
      deporte_id: this.infoUsuario().id_usuario,
      // fecha: this.fechaBusqueda()
    }

    this.partidoService.getPartidosDisponiblesUsuario(dataBusqueda).subscribe({
      next: (resp: responseSuccess) => {

        this.partidosEncontrados.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
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

      this.partidoService.joinPartido({partidoId: partidoId, userId: user}).subscribe({
        next: async (resp: responseSuccess) => {
          this.getPartidosDisponiblesUsuario();
          await loading.dismiss();
          this.alertService.message(resp.message);
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
      case 'finalizado':
        return 'Finalizado';
      case 'pendiente_reserva':
        return 'Pendiente Cancha';
      case 'cancelado':
        return 'Cancelado';
      case 'confirmado':
        return 'Confirmado';
      default:
        return estado; // Retorna el estado tal cual si no encuentra una coincidencia
    }
  }

  onDateChange(event: any) {
    const dateWithTime = new Date(event.detail.value);
    const formattedDate = this.datePipe.transform(dateWithTime, 'yyyy-MM-ddTHH:mm:ss');
    this.fechaBusqueda.set(formattedDate);
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
