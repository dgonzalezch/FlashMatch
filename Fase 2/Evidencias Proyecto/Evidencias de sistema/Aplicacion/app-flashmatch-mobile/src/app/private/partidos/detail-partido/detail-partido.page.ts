import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonItem, IonLabel, IonList, IonButton, IonAvatar, IonBackButton, IonButtons, IonSpinner, IonProgressBar, IonIcon, IonFooter, IonModal, IonSearchbar, IonImg, IonNote, IonChip, IonCardSubtitle } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartidoService } from 'src/app/services/partido.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { Partido } from 'src/app/interfaces/partido.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserInfoComponent } from 'src/app/shared/components/user-info/user-info.component';
import { StorageService } from 'src/app/services/storage.service';
import { UserEvaluationComponent } from 'src/app/shared/components/user-evaluation/user-evaluation.component';
import { register } from 'swiper/element/bundle'
import { environment } from 'src/environments/environment';

register()
@Component({
  selector: 'app-detail-partido',
  templateUrl: './detail-partido.page.html',
  styleUrls: ['./detail-partido.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonChip, IonNote, IonImg, IonSearchbar, IonModal, IonFooter, IonIcon, IonProgressBar, IonSpinner, IonButtons, IonBackButton, IonAvatar, IonButton, IonList, IonLabel, IonItem, IonCardContent, IonBadge, IonCardTitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, UserInfoComponent, RouterLink, UserEvaluationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class DetailPartidoPage {
  private route = inject(ActivatedRoute);
  private partidoService = inject(PartidoService);
  private usuarioService = inject(UsuarioService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);

  partidoActual = signal<any | null>(null);
  detalleJugador = signal<any>(null);
  partidoId = signal<any>('');
  jugadoresDisponibles = signal<any>(null);
  isModalOpen = signal<boolean>(false);
  isModalOpenEvaluate = signal<boolean>(false);

  jugadoresConfirmados = signal<any>([]);
  jugadoresPendientes = signal<any>([]);
  jugadoresInvitados = signal<any>([]);
  jugadoresRechazados = signal<any>([]);
  urlHost = signal<any>('');

  usuarioId = signal<any>('');

  async ionViewWillEnter() {
    this.urlHost.set(environment.hostUrl)
    this.usuarioId.set(await this.storageService.get('user'));
    this.route.paramMap.subscribe(params => {
      this.partidoId.set(params.get('id_partido'));
    });

    this.getDatosPartido()
  }

  getDatosPartido() {
    this.partidoService.getPartido(this.partidoId()).subscribe({
      next: (resp: responseSuccess) => {
        this.partidoActual.set(resp.data);
        this.jugadoresConfirmados.set(resp.data.jugadores.filter((jugador: any) => jugador.estado === 'confirmado'));
        this.jugadoresPendientes.set(resp.data.jugadores.filter((jugador: any) => jugador.estado === 'pendiente'));
        this.jugadoresInvitados.set(resp.data.jugadores.filter((jugador: any) => jugador.estado === 'invitado'));
        this.jugadoresRechazados.set(resp.data.jugadores.filter((jugador: any) => jugador.estado === 'rechazada'));
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  onEvaluacionEnviada() {
    // Lógica para recargar los datos o realizar la acción
    console.log("Evaluación enviada, recargando datos...");
    this.getDatosPartido();
  }

  getJugadoresDisponibles() {
    this.usuarioService.getUsuarios().subscribe({
      next: (resp: responseSuccess) => {
        const jugadores = resp.data.filter((usuario: any) => {
          // Verifica si el usuario tiene el rol "jugador"
          const esJugador = usuario.roles.includes("jugador");

          // Verifica si el usuario ya está en el partido
          const estaEnPartido = this.partidoActual().jugadores.some(
            (jugador: any) => jugador.usuario.id_usuario === usuario.id_usuario
          );

          return esJugador && !estaEnPartido;
        });

        this.jugadoresDisponibles.set(jugadores);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      },
    });
  }

  invitarJugador(idJugador: string) {
    this.partidoService.sendInvitacion({ usuario_id: idJugador, partido_id: this.partidoId() }).subscribe({
      next: (resp: responseSuccess) => {
        this.alertService.message(resp.message);
        this.getDatosPartido();
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  openModal(creador: any, typeModal: string) {
    this.detalleJugador.set(creador);

    switch (typeModal) {
      case 'detail':
        this.isModalOpen.set(true);
        break;
      case 'evaluate':
        this.isModalOpenEvaluate.set(true);
        break;
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isModalOpenEvaluate.set(false);
    this.detalleJugador.set(null);
  }

  // Función para verificar si el usuario ya ha evaluado a un jugador específico
  haEvaluadoJugador(jugador: any): boolean {
    return jugador.usuario.evaluaciones.some((evaluacion: any) => {
      return (
        evaluacion.evaluador.id_usuario === this.usuarioId() &&
        evaluacion.partido.id_partido === this.partidoActual().id_partido
      );
    });
  }

  getStarIcon(starNumber: number, promedio_evaluacion: number): string {
    const rating = promedio_evaluacion;
    if (rating >= starNumber) {
      // Si la calificación es mayor o igual al número de la estrella, muestra una estrella completa
      return 'star';
    } else if (rating >= starNumber - 0.5) {
      // Si la calificación está entre la estrella actual y 0.5 menos, muestra una media estrella
      return 'star-half';
    } else {
      // Si la calificación es menor, muestra una estrella vacía
      return 'star-outline';
    }
  }
}
