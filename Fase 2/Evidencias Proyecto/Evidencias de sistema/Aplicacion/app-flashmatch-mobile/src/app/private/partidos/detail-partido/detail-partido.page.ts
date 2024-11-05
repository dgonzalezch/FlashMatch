import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonItem, IonLabel, IonList, IonButton, IonAvatar, IonBackButton, IonButtons, IonSpinner, IonProgressBar, IonIcon, IonFooter, IonModal, IonSearchbar, IonImg, IonNote } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from 'src/app/services/partido.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { Partido } from 'src/app/interfaces/partido.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserInfoComponent } from 'src/app/shared/components/user-info/user-info.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail-partido',
  templateUrl: './detail-partido.page.html',
  styleUrls: ['./detail-partido.page.scss'],
  standalone: true,
  imports: [IonNote, IonImg, IonSearchbar, IonModal, IonFooter, IonIcon, IonProgressBar, IonSpinner, IonButtons, IonBackButton, IonAvatar, IonButton, IonList, IonLabel, IonItem, IonCardContent, IonBadge, IonCardTitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, UserInfoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailPartidoPage {
  private route = inject(ActivatedRoute);
  private partidoService = inject(PartidoService);
  private usuarioService = inject(UsuarioService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);

  partidoActual = signal<Partido | null>(null);
  detalleJugador = signal<any>(null);
  partidoId = signal<any>('');
  jugadoresDisponibles = signal<any>(null);
  isModalOpen = signal<boolean>(false);

  usuarioId = signal<any>('');

  async ionViewWillEnter () {
    this.usuarioId.set(await this.storageService.get('user'));
    this.route.paramMap.subscribe(params => {
      this.partidoId.set(params.get('id_partido'));
    });

    this.partidoService.getPartido(this.partidoId()).subscribe({
      next: (resp: responseSuccess) => {
        this.partidoActual.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getJugadoresDisponibles() {
    this.usuarioService.getUsuarios().subscribe({
      next: (resp: responseSuccess) => {
        this.jugadoresDisponibles.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  invitarJugadores() {
    console.log("Invitando jugadores...");
    // Lógica para invitar jugadores
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
