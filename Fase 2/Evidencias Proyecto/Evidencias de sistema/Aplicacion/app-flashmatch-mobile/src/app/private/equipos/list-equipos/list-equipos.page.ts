import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonAvatar, IonCol, IonRow, IonFooter, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonGrid, IonProgressBar, IonSpinner, IonSearchbar, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { EquipoService } from '../../../services/equipo.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from '../../../shared/common/alert.service';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-list-equipos',
  templateUrl: './list-equipos.page.html',
  styleUrls: ['./list-equipos.page.scss'],
  standalone: true,
  imports: [IonText, IonSearchbar, IonSpinner, IonProgressBar, IonGrid, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonRow, IonCol, IonAvatar, IonFabButton, IonFab, IonLabel, IonItem, IonList, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListEquiposPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private equipoService = inject(EquipoService);

  listEquipos = signal<Equipo[]>([]);

  // equipos = [
  //   {
  //     id_equipo: '1',
  //     nombre_equipo: 'Equipo A',
  //     logo_equipo: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  //     deporte: { nombre_deporte: 'Fútbol 7' },
  //     integrantes: [ /* Lista de integrantes */],
  //     creador: { nombre_usuario: 'Juan Pérez' },
  //     creado_en: new Date('2023-09-25T10:00:00') // Fecha de creación
  //   },
  //   {
  //     id_equipo: '2',
  //     nombre_equipo: 'Equipo B',
  //     logo_equipo: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  //     deporte: { nombre_deporte: 'Fútbol Sala' },
  //     integrantes: [ /* Lista de integrantes */],
  //     creador: { nombre_usuario: 'María Gómez' },
  //     creado_en: new Date('2023-09-26T15:30:00') // Fecha de creación
  //   }
  // ];

  ionViewWillEnter() {
    this.loadEquipos();
  }

  loadEquipos() {
    this.equipoService.getEquipos().subscribe({
      next: (resp: responseSuccess) => {
        this.listEquipos.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  viewTeamDetails(id_equipo: string) {
    console.log(`Ver detalles del equipo con ID: ${id_equipo}`);
  }
}
