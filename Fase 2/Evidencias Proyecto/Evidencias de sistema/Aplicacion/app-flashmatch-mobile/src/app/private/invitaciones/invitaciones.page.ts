import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonModal, IonButton, IonButtons, IonLabel, IonItem, IonAvatar, IonList, IonCard, IonChip, IonIcon, IonBadge, IonCol, LoadingController, AlertController } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { PartidoService } from 'src/app/services/partido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.page.html',
  styleUrls: ['./invitaciones.page.scss'],
  standalone: true,
  imports: [IonCol, IonBadge, IonIcon, IonChip, IonCard, IonList, IonAvatar, IonItem, IonLabel, IonButtons, IonButton, IonModal, IonContent, IonHeader, IonTitle, IonToolbar, RouterLink, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InvitacionesPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private usuarioService = inject(UsuarioService);
  private partidoService = inject(PartidoService);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);

  invitaciones = signal<any[]>([]); // Lista de invitaciones
  isDetallePartidoOpen = signal<boolean>(false);
  detallePartido = signal<any>(null); // Partido en detalle
  idUsuarioActual = signal<any>('')

  async ionViewWillEnter() {
    this.idUsuarioActual.set(await this.storageService.get('user'))
    this.getInvitaciones();
  }

  getInvitaciones() {
    this.partidoService.getInvitaciones(this.idUsuarioActual()).subscribe({
      next: (resp: responseSuccess) => {
        this.invitaciones.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }


  async presentAlertConfirmJoinPartido(idPartido: string) {
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
            this.aceptarInvitacion(idPartido);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRejectJoinPartido(idPartido: string) {
    const alert = await this.alertController.create({
      header: 'Rechazar invitación?',
      message: `¿Estás seguro de que deseas rechazar la invitación?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Si, rechazar',
          handler: () => {
            this.rechazarInvitacion(idPartido);
          }
        }
      ]
    });

    await alert.present();
  }



  async aceptarInvitacion(idPartido: string) {
    const loading = await this.loadingController.create({
      message: 'Uniéndose al partido...',
      duration: 3000
    });
    await loading.present();


    this.partidoService.acceptInvitacion({ usuario_id: this.idUsuarioActual(), partido_id: idPartido }).subscribe({
      next: async (resp: responseSuccess) => {
        await loading.dismiss();
        if (resp.data && resp.data.paymentUrl) {
          // Redirigir a la URL de pago proporcionada en la respuesta
          window.location.href = resp.data.paymentUrl;
        }
      },
      error: async (err: responseError) => {
        await loading.dismiss();
        this.alertService.error(err.message);
      }
    });
  }

  async rechazarInvitacion(idPartido: string) {
    const loading = await this.loadingController.create({
      message: 'Uniéndose al partido...',
      duration: 3000
    });
    await loading.present();

    this.partidoService.rejectInvitacion({ usuario_id: this.idUsuarioActual(), partido_id: idPartido }).subscribe({
      next: async (resp: responseSuccess) => {
        this.alertService.message(resp.message);
        this.getInvitaciones();
        await loading.dismiss();
      },
      error: async (err: responseError) => {
        await loading.dismiss();
        this.alertService.error(err.message);
      }
    });
  }
}
