import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonSegmentButton, IonIcon, IonButtons, IonSegment, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonCardSubtitle, IonText, IonProgressBar, IonChip, IonSpinner, IonBadge, IonSearchbar, IonFab, IonImg, IonAvatar, LoadingController, AlertController } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderMapComponent } from 'src/app/shared/components/header-map/header-map.component';
import { LocationService } from '../../../shared/common/location.service';
import { PartidoService } from 'src/app/services/partido.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { Partido } from 'src/app/interfaces/partido.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.page.html',
  styleUrls: ['./list-partidos.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonFab, IonSearchbar, IonBadge, IonSpinner, IonChip, IonProgressBar, IonText, IonCardSubtitle, IonCol, IonRow, IonGrid, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonModal, IonSegment, IonButtons, IonIcon, IonSegmentButton, IonFooter, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderMapComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListPartidosPage implements OnInit {
  private locationService = inject(LocationService);
  private partidoService = inject(PartidoService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);

  userId = signal<string>('');
  ubication = signal<string>('');
  listPartidos = signal<Partido[]>([]);

  ngOnInit() {
    this.ubication.set(this.locationService.getLocation().ubicacion);
    this.loadUserId();
    this.loadPartidos();
  }

  loadPartidos() {
    this.partidoService.getPartidos().subscribe({
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
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas unirte al partido?`,
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
          this.loadPartidos();
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
}
