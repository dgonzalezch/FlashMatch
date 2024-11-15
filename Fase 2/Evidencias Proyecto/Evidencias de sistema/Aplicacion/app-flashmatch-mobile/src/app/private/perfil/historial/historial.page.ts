import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonGrid, IonCol, IonList, IonItem, IonLabel, IonButton, IonCardSubtitle, IonIcon, IonAvatar, IonBadge, IonFooter, IonChip, IonSearchbar } from '@ionic/angular/standalone';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonChip, IonFooter, IonBadge, IonAvatar, IonIcon, IonCardSubtitle, IonButton, IonLabel, IonItem, IonList, IonCol, IonGrid, IonRow, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HistorialPage {
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private usuarioService = inject(UsuarioService);

  infoUsuario = signal<any>(null);
  idUsuario = signal<string>('');
  partidosFinalizados = signal<any[]>([]);

  async ionViewWillEnter() {
    this.idUsuario.set(await this.storageService.get('user'));
    this.getInfoUsuario();
  }

  getInfoUsuario() {
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
        this.filtrarPartidosFinalizados();
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  // Método para filtrar los partidos finalizados
  filtrarPartidosFinalizados() {
    const finalizados = this.infoUsuario().partidos.filter(
      (partidoUsuario: any) => partidoUsuario.partido.estado === 'finalizado'
    );
    this.partidosFinalizados.set(finalizados);
  }
}
