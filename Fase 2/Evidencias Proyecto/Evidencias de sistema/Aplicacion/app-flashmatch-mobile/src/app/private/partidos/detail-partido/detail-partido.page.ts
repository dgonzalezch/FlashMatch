import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonCardContent, IonItem, IonLabel, IonList, IonButton, IonAvatar, IonBackButton, IonButtons, IonSpinner, IonProgressBar, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from 'src/app/services/partido.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { Partido } from 'src/app/interfaces/partido.interface';

@Component({
  selector: 'app-detail-partido',
  templateUrl: './detail-partido.page.html',
  styleUrls: ['./detail-partido.page.scss'],
  standalone: true,
  imports: [IonIcon, IonProgressBar, IonSpinner, IonButtons, IonBackButton, IonAvatar, IonButton, IonList, IonLabel, IonItem, IonCardContent, IonBadge, IonCardTitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class DetailPartidoPage {
  private route = inject(ActivatedRoute);
  private partidoService = inject(PartidoService);
  private alertService = inject(AlertService);

  partidoActual = signal<Partido | null>(null);
  partidoId = signal<any>('');

  ionViewWillEnter () {
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

  invitarJugadores() {
    console.log("Invitando jugadores...");
    // Lógica para invitar jugadores
  }
}
