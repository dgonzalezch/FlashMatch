import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonIcon, IonItemDivider, IonCardContent, IonCard, IonAccordion, IonAccordionGroup, IonText, IonNote } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  standalone: true,
  imports: [IonNote, IonText, IonAccordionGroup, IonAccordion, IonCard, IonCardContent, IonItemDivider, RouterLink, IonIcon, IonBadge, IonLabel, IonItem, IonListHeader, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NotificationsPage {
  private usuarioService = inject(UsuarioService);
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);

  infoUsuario = signal<any>('');
  notificacionesNoLeidas = signal<any[]>([]);
  notificacionesLeidas = signal<any[]>([]);

  ionViewWillEnter() {
    this.getInfoUsuario();
  }

  async getInfoUsuario() {
    this.usuarioService.getUsuario(await this.storageService.get('user')).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
        this.filtrarNotificaciones();
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  filtrarNotificaciones() {
    const usuario = this.infoUsuario();
    if (usuario?.notificaciones) {
      this.notificacionesNoLeidas.set(usuario.notificaciones.filter((notificacion: any) => !notificacion.leido));
      this.notificacionesLeidas.set(usuario.notificaciones.filter((notificacion: any) => notificacion.leido));
    }
  }

  async markAllAsRead() {
    const userId = await this.storageService.get('user');
    this.usuarioService.markNotificationsAsRead(userId).subscribe({
      next: () => {
        this.infoUsuario.update(usuario => {
          usuario.notificaciones.forEach((notificacion: any) => notificacion.leido = true);
          return usuario;
        });
        this.filtrarNotificaciones();
      },
      error: (err: responseError) => {
        this.alertService.error('Error al actualizar notificaciones');
      }
    });
  }

  ionViewWillLeave() {
    this.markAllAsRead();
  }
}
